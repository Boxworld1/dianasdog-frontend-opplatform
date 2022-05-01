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
  name: resourceSelect,
  data() {
    return {
      options: [],
      value: ''
    }
  },
  methods: {
    set_options(val) {

    },
    get_options($event) {
      if ($event = true) {
        url = 
        request_json.GET(set_options, url);
      }
    }
  },

}
</script>
