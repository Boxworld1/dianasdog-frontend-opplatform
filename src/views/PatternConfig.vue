<template>
  <div>
    <el-form ref="form" label-width="80px">
      <el-form-item label="配置目标">
        <el-select
          v-model="target"
          placeholder="请选择配置目标"
          style="margin-right: 45px"
        >
          <el-option
            v-for="(resource, index) in resourceList"
            :key="index"
            :label="resource"
            :value="resource"
          >
          </el-option>
        </el-select>

        <el-button
          style="display: inline-block; margin-right: 15px"
          v-on:click="postDialog.dialogVisible = true"
        >
          <i class="el-icon-upload">upload</i>
        </el-button>
        <el-button
          style="display: inline-block; margin-right: 15px"
          v-on:click="deleteDialog.dialogVisible = true"
        >
          <i class="el-icon-delete">delete</i>
        </el-button>
      </el-form-item>
      <el-form-item label="模板列表">
        <div id="pattern-list">
          <PatternBlock
            v-for="(pattern, index) in patternList"
            :rawpattern="pattern"
            :key="index"
            v-bind:edit="edit"
            v-bind:deletepattern="deletepattern"
          />
        </div>
      </el-form-item>
    </el-form>
    <PostDialog
      :dialogVisible="postDialog.dialogVisible"
      :target="target"
      v-bind:cancelPost="cancelPost"
      v-bind:postpattern="postpattern"
    />
    <DeleteDialog
      :dialogVisible="deleteDialog.dialogVisible"
      :target="target"
      :patternList="patternList"
      v-bind:cancelDelete="cancelDelete"
      v-bind:deletepattern="deletepattern"
    />
    <EditDialog
      :dialogVisible="editDialog.dialogVisible"
      :target="target"
      :rawpattern="curpattern"
      v-bind:cancelEdit="cancelEdit"
      v-bind:editpattern="editpattern"
    />
  </div>
</template>

<script>
import PatternBlock from "../components/PatternConfig/PatternBlock";
import PostDialog from "../components/PatternConfig/PostDialog";
import DeleteDialog from "../components/PatternConfig/DeleteDialog";
import EditDialog from "../components/PatternConfig/EditDialog";
import request_json from "../utils/communication";

export default {
  name: "PatternConfig",
  components: {
    PatternBlock,
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
      },
      target: "",
      curpattern: "",
      resourceList: [],
      patternList: [],
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
      if (!bool) {
        this.$message({
          message: "编辑失败",
          type: "error",
        });
      }
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
      if (this.target === "") {
        this.$message({
          message: "请选择配置目标",
          type: "warning",
        });
      } else {
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
    editpattern(oldpattern, newpattern) {
      var msg = {
        type: "pattern",
        resource: this.target,
        data: [oldpattern],
        operation: "delete",
      };
      request_json.POST(this.check, msg, "/pattern");
      msg.data = [newpattern];
      msg.operation = "insert";
      request_json.POST(this.edit_success, msg, "/pattern");
    },
    cancelPost() {
      this.postDialog.dialogVisible = false;
    },
    cancelDelete() {
      this.deleteDialog.dialogVisible = false;
    },
    cancelEdit() {
      this.editDialog.dialogVisible = false;
    },
  },
  watch: {
    target() {
      this.getpattern();
    },
  },
  created() {
    request_json.GET(this.read_resource, "/category");
  },
};
</script>

<style>
</style>