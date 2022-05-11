<template>
  <div>
    <el-tag v-for="(tag, index) in curTags" :key="index" :type="types[index % 5]" closable @close="handleClose(tag)"
      style="margin-left: 10px;font-size:medium ">
      {{ tag }}
    </el-tag>
    <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="medium" style="width: 90px;
  margin-left: 10px;
  vertical-align: bottom;" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
    </el-input>
    <el-button v-else class="button-new-tag" size="medium" @click="showInput" style="margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;">+ New Word</el-button>
    <el-row style="margin-top:10px">
      <el-button size="medium" style="margin-left: 15px;" v-on:click="cancelchange()">取 消</el-button>
      <el-button type="primary" size="medium" style="margin-left: 15px;"
        :disabled="Taglist.toString() == curTags.toString() && type!='pattern'" v-on:click="submitchange(type, Taglist, curTags)">确 定
      </el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "dynamicTags",
  props: {
    type: {
      type: String,
      default: () => ""
    },
    Taglist: {
      type: Array,
      default: () => [],
    },
    backflag: {
      type: Boolean,
      default: () => true
    },
    cancelchange: {
      type: Function,
      default: () => { },
    },
    submitchange: {
      type: Function,
      default: () => { },
    },
  },
  data() {
    return {
      curTags: [],
      types: ["", "success", "info", "warning", "danger"],
      inputVisible: false,
      inputValue: "",
    }
  },
  methods: {
    handleClose(tag) {
      this.curTags.splice(this.curTags.indexOf(tag), 1);
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
        if (this.curTags.indexOf(inputValue) != -1 && this.type != "pattern") {
          this.$message({
            message: "The word has existed.",
            type: "warning",
          });
        } else {
          this.curTags.push(inputValue);
        }
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
  },
  watch: {
    Taglist(curval) {
      this.curTags = curval.concat();
    },
    backflag() {
      this.curTags = this.Taglist.concat();
    }
  },
  created() {
    this.curTags = this.Taglist.concat();
  }
};
</script>