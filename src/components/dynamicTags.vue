<template>
  <div>
    <div>
      <el-tag v-for="(tag, index) in curTags" :key="index" :type="types[index % 5]" closable @close="handleClose(tag)">
        {{ tag }}
      </el-tag>
      <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small"
        @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
      </el-input>
      <el-button class="button-new-tag" size="small" @click="showInput">+ New Word</el-button>
    </div>
      <el-button v-on:click="cancelchange()">取 消</el-button>
      <el-button type="primary" v-on:click="submitchange(type, Taglist, curTags)">确 定</el-button>
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
          alert("The word has existed.");
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

<style>
.el-tag+.el-tag {
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
