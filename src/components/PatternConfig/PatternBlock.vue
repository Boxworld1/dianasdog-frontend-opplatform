<template>
  <el-row style="background: #b3c0d1; border-radius: 4px; margin: 10px ">
    <span style="text-align:center; font-size:medium">{{ rawpattern }}</span>
    <span>
      <el-button style="float: right" type="danger" v-on:click="deletepattern([rawpattern])"><i
          class="el-icon-delete" />删除</el-button>
      <el-button style="float: right" type="primary" v-on:click="edit(rawpattern)"><i class="el-icon-edit" />编辑
      </el-button>
    </span>
  </el-row>
</template>

<script>
export default {
  name: "PatternBlock",
  props: {
    rawpattern: {
      type: String,
      default: () => "",
    },
    edit: {
      type: Function,
      default: () => {},
    },
    deletepattern: {
      type: Function,
      default: () => {},
    },
  },
};
</script>
