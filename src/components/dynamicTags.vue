<template>
  <div>
    <div>
      <el-tag v-for="(tag, index) in rawTags" :key="index" :type="types[index % 5]" closable @close="handleClose(tag)">
        {{ tag }}
      </el-tag>
      <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small"
        @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
      </el-input>
      <el-button class="button-new-tag" size="small" @click="showInput">+ New Word</el-button>
    </div>
    <span slot="footer">
      <el-button v-on:click="cancelchange()">取 消</el-button>
      <el-button type="primary" v-on:click="submitchange(type, addTags, deleteTags)">确 定</el-button>
    </span>
  </div>
</template>

<script>
export default {
  name: "dynamicTags",
  props: {
    Taglist: {
      type: Array,
      default: () => ["test1", "test2", "test3", "test4", "test5"],
    },
    type: {
      type: String,
      default: () => ""
    },
    submitchange: {
      type: Function,
      default: () => { },
    },
  },
  data() {
    return {
      rawTags: [],
      addTags: [],
      deleteTags: [],
      types: ["", "success", "info", "warning", "danger"],
      inputVisible: false,
      inputValue: "",
    }
  },
  methods: {
    handleClose(tag) {
      this.rawTags.splice(this.rawTags.indexOf(tag), 1);
      if (
        this.Taglist.indexOf(tag) != -1 &&
        this.deleteTags.indexOf(tag) == -1
      ) {
        this.deleteTags.push(tag);
      }
      if (this.addTags.indexOf(tag) != -1) {
        this.addTags.splice(this.addTags.indexOf(tag), 1);
      }
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
        if (this.rawTags.indexOf(inputValue) != -1) {
          alert("The word has existed.");
        } else {
          this.rawTags.push(inputValue);
        }
        if (
          this.Taglist.indexOf(inputValue) != -1 &&
          this.deleteTags.indexOf(inputValue) != -1
        ) {
          this.deleteTags.splice(this.deleteTags.indexOf(inputValue), 1);
        }
        if (
          this.Taglist.indexOf(inputValue) == -1 &&
          this.addTags.indexOf(inputValue) == -1
        ) {
          this.addTags.push(inputValue);
        }
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    cancelchange() {
      this.rawTags = this.Taglist;
      this.addTags = [];
      this.deleteTags = [];
    },
  },
  watch: {
    Taglist(curval) {
      this.rawTags = curval.concat();
    },
  },
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