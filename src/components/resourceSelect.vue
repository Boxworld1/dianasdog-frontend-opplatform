<template>
  <div>
    <el-row>
      <el-select
        v-model="value"
        filterable
        placeholder="请选择特型卡名称"
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
    value: {
      type: String,
      default: () => '',
    },
    get_options:{
      type: Function,
      default: () => {
        return () => {
        }
      }
    }
  },
  data() {
    return {
    }
  },
  watch: {
    value: {
      handler(value) {
        this.$emit('changeValue', value)
      }
    }
  }
};
</script>
