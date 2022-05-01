<template>
  <el-select v-model="value" filterable placeholder="请选择" :visible-change="get_options($event)">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>

<script>
import request_json from '../utils/communication'
export default {
  name: "resourceSelect",
  props: {
    options:{
      type: Object,
      default: () => []
    },
    value: {
      type: String,
      default: () => ''
    }
  },
  methods: {
    set_options(val) {

    },
    get_options($event) {
      if ($event == true) {
        // url = 
        // request_json.GET(set_options, url);
      }
    }
  },

}
</script>
