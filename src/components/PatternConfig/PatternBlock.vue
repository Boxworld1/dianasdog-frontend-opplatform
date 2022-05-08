<template>
  <el-menu
    :default-openeds="[]"
    @select="handleSelect"
    style="background: #b0c7e7; border-radius: 4px; margin: 10px"
  >
    <el-submenu index="pattern" style="text-align: left">
      <template slot="title"
        ><i class="el-icon-s-promotion" />
        {{ rawpattern }}
      </template>
      <el-menu-item index="edit"> <i class="el-icon-edit" />Edit</el-menu-item>
      <el-menu-item index="delete">
        <i class="el-icon-delete" />Delete</el-menu-item
      >
    </el-submenu>
  </el-menu>
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
  methods: {
    handleSelect(key) {
      if (key == "edit") {
        this.edit(this.rawpattern);
      } else {
        this.deletepattern([this.rawpattern]);
      }
    },
  },
};
</script>
