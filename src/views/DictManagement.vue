<template>
  <el-form>
    <el-form-item label="Resource">
      <el-select
        v-model="target"
        placeholder="请选择配置目标"
        style="margin-right: 45px"
      >
        <el-option
          v-for="(resource, index) in resourceList"
          :key="index"
          :label="resource"
          :value="resource"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Intent"> {{ intentList }}</el-form-item>
    <el-form-item label="Garbage"> {{ garbageList }}</el-form-item>
  </el-form>
</template>

<script>
import request_json from "../utils/communication";

export default {
  name: "DictManagement",
  data() {
    return {
      target: "",
      resourceList: [],
      intentList: [],
      garbageList: [],
    };
  },
  methods: {
    read_resource(param) {
      this.resourceList = param.data;
    },
    read_intent(param) {
      this.intentList = param.data;
    },
    read_garbage(param) {
      this.garbageList = param.data;
    },
  },
  watch: {
    target() {
      var msg = {
        resource: this.target,
        type: "intent",
      };
      request_json.GET_WITH_PARAMS(this.read_intent, "/pattern", msg);
      msg.type = "garbage";
      request_json.GET_WITH_PARAMS(this.read_garbage, "/pattern", msg);
    },
  },
  created() {
    request_json.GET(this.read_resource, "/category");
  },
};
</script>
