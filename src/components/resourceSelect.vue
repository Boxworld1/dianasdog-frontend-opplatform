<template>
  <div>
    <el-row>
      <el-select
        v-model="value_"
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
      value_: ''
    }
  },
  watch: {
    value(newVal) {
      this.value_ = newVal;
    },
    value_: {
      handler(newval) {
        this.$emit('changeValue', newval);
      }
    }
  }
};
</script>
