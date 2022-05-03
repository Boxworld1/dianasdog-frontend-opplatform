<template>
  <el-dialog
    style="text-align: center"
    title="编辑模板"
    :visible.sync="visible"
    :show-close="false"
    :before-close="cancelEdit"
    width="60%"
  >
    <el-form label-width="80px">
      <el-form-item label="Resource">{{ target }}</el-form-item>
      <el-form-item label="pattern">
        <el-tag
          v-for="(tag, index) in dynamicTags"
          :key="index"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)"
        >
          {{ tag }}
        </el-tag>
        <el-input
          class="input-new-tag"
          v-if="inputVisible"
          v-model="inputValue"
          ref="saveTagInput"
          size="small"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
        >
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput"
          >+ New Tag</el-button
        >
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button v-on:click="cancelEdit()">取 消</el-button>
      <el-button
        type="primary"
        :disabled="dynamicTags.length == 0"
        v-on:click="editpattern(rawpattern, dynamicTags.join('+'))"
        >确 定</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: "PostDialog",
  props: {
    dialogVisible: {
      type: Boolean,
      default: () => true,
    },
    target: {
      type: String,
      default: () => "",
    },
    rawpattern: {
      type: String,
      default: () => "",
    },
    cancelEdit: {
      type: Function,
      default: () => {
        return () => {};
      },
    },
    editpattern: {
      type: Function,
      default: () => {
        return () => {};
      },
    },
  },
  data() {
    return {
      dynamicTags: [],
      inputVisible: false,
      inputValue: "",
      visible: false,
    };
  },
  methods: {
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
  },
  watch: {
    rawpattern(curval) {
      this.dynamicTags = curval.split("+");
    },
    dialogVisible(curval) {
      this.visible = curval;
    },
  },
};
</script>

<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>