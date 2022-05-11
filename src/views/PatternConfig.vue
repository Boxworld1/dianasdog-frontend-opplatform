<template>
  <div>
    <el-row>
      <el-col :span="6">特型卡名称：</el-col>
      <el-col :span="12">
        <el-select v-model="target" placeholder="请选择特型卡名称" style="margin-right: 45px">
          <el-option v-for="(resource, index) in resourceList" :key="index" :label="resource" :value="resource">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <div id="pattern-list">
      <el-table :data="new_patternList"
        style="width: 100%; font-size: large;font-weight: 500;font-family: 'Times New Roman', Times, serif;"
        height="500">
        <el-table-column fixed prop="data" label="模板内容" width="300" />
        <el-table-column label="操作" align="right">
          <template slot-scope="scope">
            <el-button type="primary" v-on:click="edit(new_patternList[scope.$index].data)"><i class="el-icon-edit" />编辑
            </el-button>
            <el-button type="danger" v-on:click="deletepattern([new_patternList[scope.$index].data])"><i
                class="el-icon-delete" />删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="foot">
      <template>
        <el-button type="primary" style="display: inline-block; margin-right: 15px"
          v-on:click="postDialog.dialogVisible = true">
          <i class="el-icon-upload">上传模板</i>
        </el-button>
        <el-button type="warning" style="display: inline-block; margin-right: 15px"
          v-on:click="deleteDialog.dialogVisible = true">
          <i class="el-icon-delete">批量删除</i>
        </el-button>
      </template>
    </div>
    <PostDialog :dialogVisible="postDialog.dialogVisible" :target="target" v-bind:cancelPost="cancelPost"
      v-bind:postpattern="postpattern" />
    <DeleteDialog :dialogVisible="deleteDialog.dialogVisible" :target="target" :patternList="patternList"
      v-bind:cancelDelete="cancelDelete" v-bind:deletepattern="deletepattern" />
    <EditDialog :dialogVisible="editDialog.dialogVisible" :target="target" :rawpattern="curpattern"
      :backflag="editDialog.backflag" v-bind:cancelEdit="cancelEdit" v-bind:editpattern="editpattern" />
  </div>
</template>

<script>
import PostDialog from "../components/PatternConfig/PostDialog";
import DeleteDialog from "../components/PatternConfig/DeleteDialog";
import EditDialog from "../components/PatternConfig/EditDialog";
import request_json from "../utils/communication";

export default {
  name: "PatternConfig",
  components: {
    PostDialog,
    DeleteDialog,
    EditDialog,
  },
  data() {
    return {
      postDialog: {
        dialogVisible: false,
      },
      deleteDialog: {
        dialogVisible: false,
      },
      editDialog: {
        dialogVisible: false,
        backflag: true,
      },
      target: "",
      curpattern: "",
      checkValue: false,
      resourceList: [],
      patternList: [],
      new_patternList: [],
    };
  },
  methods: {
    post_success(bool) {
      if (bool) {
        this.getpattern();
        this.$message({
          message: "上传成功",
          type: "success",
        });
      } else {
        this.$message({
          message: "上传失败",
          type: "error",
        });
      }
      this.postDialog.dialogVisible = false;
    },
    delete_success(bool) {
      if (bool) {
        this.getpattern();
        this.$message({
          message: "删除成功",
          type: "success",
        });
      } else {
        this.$message({
          message: "删除失败",
          type: "error",
        });
      }
      this.deleteDialog.dialogVisible = false;
    },
    edit_success(bool) {
      if (bool) {
        this.getpattern();
        this.$message({
          message: "编辑成功",
          type: "success",
        });
      } else {
        this.$message({
          message: "编辑失败",
          type: "error",
        });
      }
      this.editDialog.dialogVisible = false;
    },
    check(bool) {
      this.checkValue = bool
    },
    read_pattern(param) {
      this.patternList = param.data;
    },
    read_resource(param) {
      this.resourceList = param.data;
    },
    edit(rawpattern) {
      this.curpattern = rawpattern;
      this.editDialog.dialogVisible = true;
    },
    getpattern() {
      if (this.target != "") {
        var msg = {
          resource: this.target,
          type: "pattern",
        };
        request_json.GET_WITH_PARAMS(this.read_pattern, "/pattern", msg);
      }
    },
    postpattern(patterns) {
      var msg = {
        type: "pattern",
        resource: this.target,
        data: patterns,
        operation: "insert",
      };
      request_json.POST(this.post_success, msg, "/pattern");
    },
    deletepattern(patterns) {
      var msg = {
        type: "pattern",
        resource: this.target,
        data: patterns,
        operation: "delete",
      };
      request_json.POST(this.delete_success, msg, "/pattern");
    },
    async editpattern(type, Taglist, curTags) {
      if (Taglist.join('+') == curTags.join('+')) {
        this.$message({
          message: "编辑成功",
          type: "success",
        });
        this.editDialog.dialogVisible = false;
      } else {
        var msg = {
          type: type,
          resource: this.target,
          data: [Taglist.join('+')],
          operation: "delete",
        };
        await request_json.POST(this.check, msg, "/pattern").then(() => {
          if (!this.checkValue) {
            this.$message({
              message: "编辑失败",
              type: "error",
            });
          } else if (curTags.length == 0) {
            this.getpattern();
            this.$message({
              message: "编辑成功",
              type: "success",
            });
            this.editDialog.dialogVisible = false;
          } else {
            msg.data = [curTags.join('+')];
            msg.operation = "insert";
            request_json.POST(this.edit_success, msg, "/pattern");
          }

        })
      }
    },
    cancelPost() {
      this.postDialog.dialogVisible = false;
    },
    cancelDelete() {
      this.deleteDialog.dialogVisible = false;
    },
    cancelEdit() {
      this.editDialog.backflag = !this.editDialog.backflag;
      this.editDialog.dialogVisible = false;
    },
  },
  watch: {
    target() {
      this.getpattern();
    },
    patternList(curval) {
      this.new_patternList = []
      for (var i in curval) {
        this.new_patternList.push({ data: curval[i] })
      }
    }
  },
  created() {
    request_json.GET(this.read_resource, "/category");
  },
};
</script>

<style>
.foot {
  margin-top: 20px;
}
</style>
