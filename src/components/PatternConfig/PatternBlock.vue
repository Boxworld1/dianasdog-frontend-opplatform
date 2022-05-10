<template>
  <div style="background: #b0c7e7; border-radius: 4px; margin: 10px ">
    <span style="text-align: left"><i class="el-icon-s-promotion" />{{ rawpattern }}</span>
    <span>
      <!-- <el-button type="primary" icon="el-icon-edit" circle v-on:click="edit(rawpattern)"></el-button>
      <el-button type="danger" icon="el-icon-delete" circle v-on:click="deletepattern([rawpattern])"></el-button> -->
      <el-button style="float: right" type="danger" v-on:click="deletepattern([rawpattern])"><i
          class="el-icon-delete" />Delete</el-button>
      <el-button style="float: right" type="primary" v-on:click="edit(rawpattern)"><i class="el-icon-edit" />Edit
      </el-button>
    </span>
  </div>
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
