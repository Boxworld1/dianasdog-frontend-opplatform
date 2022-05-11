<template>
  <div>
    <el-row class="el-row-style">
      <el-col :span="6">增加数据</el-col>
      <el-col :span="6">
        <resource-select
          :options="options"
          @changeValue="changeValueInsert"
          :get_options="get_options"
          :value="insertResource"
        />
      </el-col>
      <el-col :span="12">
        <el-upload
          class="upload-demo"
          ref="upload"
          action="#"
          :file-list="fileList"
          :on-change="fileIncrease"
          :on-remove="fileRemove"
          :on-preview="filePreview"
          :auto-upload="false"
        >
          <el-button slot="trigger" size="small" type="primary"
            >选取文件</el-button
          >
          <el-button
            style="margin-left: 10px"
            size="small"
            type="success"
            @click="submitUpload"
            :disabled="insertResource == ''"
            >上传到服务器</el-button
          >
        </el-upload>
      </el-col>
    </el-row>
    <el-row class="el-row-style">
      <el-col :span="6">删除数据</el-col>
      <el-col :span="6">
        <resource-select
          :options="options"
          @changeValue="changeValueDelete"
          :get_options="get_options"
          :value="deleteResource"
        />
      </el-col>
      <el-col :span="12">
        <el-select
          v-model="deleteFile"
          filterable
          placeholder="请选择想要删除的文件"
          @visible-change="get_deleteFile"
        >
          <el-option
            v-for="item in deletableFile"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-col>
      <div>
        <el-button type="primary" :disabled="deleteButtonDisable" @click="fdelete">确认删除</el-button>
      </div>
    </el-row>
    <el-row class="el-row-style">
      <el-col :span="6">修改数据</el-col>
      <el-col :span="6">
        <resource-select
          :options="options"
          @changeValue="changeValueItem"
          :get_options="get_options"
          :value="itemResource"
        />
      </el-col>
      <el-col :span="10">
        <!-- 提供一个搜索item的key -->
        <el-input v-model="itemKey" placeholder="请输入item的key" style="margin-left: 30px">
          <el-button icon="el-icon-search" slot="append" @click="searchItem" :disabled="searchItemDisable" />
        </el-input>
      </el-col>
    </el-row>
    <el-dialog :title="itemKey" :visible.sync="itemDialogVisible">
      <!-- xuanran -->
      <el-input type="textarea" :rows="18" v-model="itemBody"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="
          itemDialogVisible = false;
        itemBody = '';
        ">取 消</el-button>
        <el-button type="primary" @click="submitDialogItem">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import request_json from "../utils/communication";
import resourceSelect from "@/components/resourceSelect.vue";
export default {
  components: { resourceSelect },
  name: "DataManagement",
  data() {
    return {
      options: [],
      insertResource: "",
      fileList: [],
      deletableFile: [],
      deleteFile: "",
      deleteButtonDisable: true,
      deleteResource: "",
      itemResource: "",
      itemKey: "",
      searchItemDisable: true,
      itemDialogVisible: false,
      itemBody: "",
    };
  },
  methods: {
    get_options(bool) {
      if (bool) {
        var url = "/category";
        request_json.GET(this.set_options, url);
      }
    },
    set_options(val) {
      this.options = val.data;
    },
    changeValueInsert(value) {
      this.insertResource = value;
    },
    changeValueDelete(value) {
      this.deleteResource = value;
    },
    changeValueItem(value) {
      this.itemResource = value;
    },
    get_deleteFile(bool) {
      if (bool) {
        if (this.deleteResource == "") {
          return;
        }
        var params = {
          resource: this.deleteResource,
        };
        request_json.GET_WITH_PARAMS(
          this.get_deletableFile,
          "/dataname",
          params
        );
      }
    },
    get_deletableFile(val) {
      this.deletableFile = val.data;
    },
    post_success(bool) {
      if (bool) {
        this.$message({message: "上传文件成功",
        type: "success"});
      } else {
        this.$message({message: "上传文件失败", type: "error"});
      }
    },
    delete_success(bool) {
      if (bool) {
        this.$message({message: "删除文件成功",
        type: "success"});
      } else {
        this.$message({message: "删除文件失败", type: "error"});
      }
    },
    fileIncrease(file) {
      if (file.status !== "ready") return;
      this.fileList.push(file);
    },
    fileRemove(file) {
      var index = this.fileList.findIndex((item) => {
        return item === file;
      });
      this.fileList.splice(index, 1);
    },
    filePreview() {
      //todo: show file context
    },
    submitUpload() {
      if (this.fileList.length === 0) {
        this.$message({message: "没有可上传的文件！",
        type: "warning"});
      }
      for (var i = 0; i < this.fileList.length; i++) {
        var formData = new FormData();
        formData.append("file", this.fileList[i].raw);
        formData.append("type", "insert");
        formData.append("resource", this.insertResource);
        formData.append("filename", this.fileList[i].name);

        request_json.POST_File(this.post_success, formData, "/data");
      }
      this.insertResource = '';
      this.fileList = [];
    },
    fdelete() {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
      var formData = new FormData();
      formData.append("resource", this.deleteResource);
      formData.append("type", "delete");
      formData.append("filename", this.deleteFile);

      request_json.POST_File(this.delete_success, formData, "/data");
      this.deleteFile = "";
      this.deleteResource = "";
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    getItemBody(val) {
      this.itemBody = val.data;
    },
    searchItem() {
      this.itemDialogVisible = true;
      var params = {
        resource: this.itemResource,
        key: this.itemKey,
      };
      request_json.GET_WITH_PARAMS(this.getItemBody, "/item", params);
    },
    submitDialogItem() {
      var formData = new FormData();
      var item = {
        data: this.itemBody,
      };
      formData.append("resource", this.itemResource);
      formData.append("type", "insert");
      formData.append("data", JSON.stringify(item));
      request_json.POST_File(this.item_post_success, formData, "data");
    },
    item_post_success(bool) {
      if (bool) {
        this.itemDialogVisible = false;
        this.$message({message: this.itemResource + this.itemKey + "上传成功！",
        type: "success",
        });
        this.itemResource = '';
        this.itemKey = '';
        this.itemBody = '';
      }
      else {
        this.$message({message: this.itemResource + this.itemKey + "上传失败！",
        type: "error"});
      }
    }
  },
  watch: {
    deleteFile: {
      handler(newDeleteFile) {
        if (newDeleteFile === "") {
          this.deleteButtonDisable = true;
        } else {
          this.deleteButtonDisable = false;
        }
      },
    },
    // deleteResource: {
    //   handler(newDeleteResource) {
    //     if (newDeleteResource == "") {
    //       return;
    //     }
    //     var params = {
    //       resource: newDeleteResource,
    //     };
    //     request_json.GET_WITH_PARAMS(
    //       this.get_deletableFile,
    //       "/dataname",
    //       params
    //     );
    //   },
    // },
    itemKey: {
      handler(newItemKey) {
        if (newItemKey == "") {
          this.searchItemDisable = true;
          return;
        }
        if (this.itemResource == "") {
          this.searchItemDisable = true;
          return;
        }
        this.searchItemDisable = false;
      },
    },
  },
};
</script>

<style>
.el-row-style {
  color: #333;
  line-height: 60px;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  padding: 20px;
}
</style>
