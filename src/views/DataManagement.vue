<template>
  <div>
    <el-row class="el-row-style">
      <el-col :span="6">增加数据</el-col>
      <el-col :span="8">
        <el-select v-model="insertResource" placeholder="特性卡名称">
          <el-option label="目标一" value="car"></el-option>
          <el-option label="目标二" value="poem"></el-option>
        </el-select>
      </el-col>
      <el-col :span="10">
        <el-upload
          class="upload-demo"
          ref="upload"
          action="#"
          :on-change="fileChange"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          :before-upload="beforeUpload"
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
            >上传到服务器</el-button
          >
        </el-upload>
      </el-col>
    </el-row>
    <el-row class="el-row-style">
      <el-col :span="6">删除数据</el-col>
      <el-col :span="6">
        <el-select v-model="deleteResource" placeholder="特性卡名称">
          <el-option label="目标一" value="car"></el-option>
          <el-option label="目标二" value="poem"></el-option>
        </el-select>
      </el-col>
      <el-col :span="12">
        <el-select
          v-model="deleteFile"
          filterable
          placeholder="请选择想要删除的文件"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.value"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-col>
      <div>
        <el-button
          type="primary"
          :disabled="deleteButtonDisable"
          @click="fdelete"
          >确认删除</el-button
        >
      </div>
    </el-row>
    <el-row class="el-row-style">
      <el-col :span="6">修改数据</el-col>
      <el-col :span="6">
        <el-select v-model="deleteResource" placeholder="特性卡名称">
          <el-option label="目标一" value="car"></el-option>
          <el-option label="目标二" value="poem"></el-option>
        </el-select>
      </el-col>
      <el-col :span="12">
      <!-- 提供一个搜索item的key -->
      </el-col>
    </el-row>
  </div>
</template>

<script>
import request_json from "../utils/communication";
export default {
  name: "DataManagement",
  data() {
    return {
      insertResource: "",
      fileList: [],
      deleteFile: "",
      deleteButtonDisable: true,
      options: [],
      deleteResource: "",
    };
  },
  mounted() {
    request_json.GET(this.get_options, "/options");
  },
  methods: {
    get_options(val) {
      this.options = val; //要求后端存储为一个json数组,形式为[{"value": },{},{}]
    },
    fileChange(file) {
      this.fileList.push(file);
    },
    post_success(bool) {
      if (bool) {
        alert("上传成功");
      } else {
        alert("上传失败");
      }
    },
    submitUpload() {
      for (var i = 0; i < this.fileList.length; i++) {
        var formData = new FormData();
        formData.append("data", this.fileList[i].raw);
        formData.append("type", "insert");
        formData.append("resource", "poem");
        formData.append("file", this.fileList[i].name);

        request_json.POST_File(this.post_success, formData, "/data");
      }
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    fdelete() {
      var delete_json = {
        type: "delete",
        resource: this.deleteResource,
        file: this.deleteFile,
      };
      request_json.POST(this.post_success, delete_json, "/data");
      this.deleteFile = "";
      this.deleteResource = "";
    },
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
