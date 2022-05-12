<template>
  <el-dialog style="text-align: center" title="删除模板" :visible.sync="visible" :show-close="false"
    :before-close="cancelDelete" width="60%">
    <el-form label-width="80px">
      <el-form-item label="Resource">{{ target }}</el-form-item>
      <el-form-item label="Pattern">
        <el-checkbox-group v-model="checkedPatterns">
          <el-checkbox v-for="pattern in patternList" :label="pattern" :key="pattern" style="
              display: block;
              padding-top: 10px;
              margin-left: 35%;
              text-align: left;
            ">
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button v-on:click="cancelDelete()">取 消</el-button>
      <el-button type="primary" :disabled="checkedPatterns.length === 0" v-on:click="deletepattern(checkedPatterns)">确 定
      </el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: "DeleteDialog",
  props: {
    dialogVisible: {
      type: Boolean,
      default: () => true,
    },
    target: {
      type: String,
      default: () => "",
    },
    patternList: {
      type: Array,
      default: () => new Array(1).fill("Undefined"),
    },
    cancelDelete: {
      type: Function,
      default: () => { },
    },
    deletepattern: {
      type: Function,
      default: () => { },
    },
  },
  data() {
    return {
      visible: false,
      checkedPatterns: [],
    };
  },
  watch: {
    dialogVisible(curval) {
      this.visible = curval;
      this.checkedPatterns = []
    },
  },
};
</script>