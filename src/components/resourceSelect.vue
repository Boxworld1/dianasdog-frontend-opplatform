<template>
  <div>
    <el-row>
      <el-col :span="8">
      <p>特性卡名称：</p>
      </el-col>
      <el-col :span="16">
      <el-select
        v-model="value"
        filterable
        placeholder="请选择"
        @visible-change="get_options"
      >
        <el-option
          v-for="item in options"
          :key="item"
          :label="item"
          :value="item"
        >
        </el-option>
      </el-select>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "resourceSelect",
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    get_options:{
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      value: ''
    }
  },
  watch: {
    value: {
      handler(value){
        this.$emit('changeValue', value)
      }
    }
  }
};
</script>
