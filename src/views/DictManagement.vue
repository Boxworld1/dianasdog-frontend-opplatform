<template>
  <el-form>
    <el-form-item label="配置目标">
      <el-select v-model="target" placeholder="请选择配置目标" style="margin-right: 45px">
        <el-option v-for="(resource, index) in resourceList" :key="index" :label="resource" :value="resource">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Intent">
      <dynamicTags v-if="target!=''" :type="'intent'" :Taglist="intentList" :backflag="backflag" :cancelchange="cancelchange"
        :submitchange="submitchange" />
    </el-form-item>
    <el-form-item label="Garbage">
      <dynamicTags v-if="target!=''" :type="'garbage'" :Taglist="garbageList" :backflag="backflag" :cancelchange="cancelchange"
        :submitchange="submitchange" />
    </el-form-item>
  </el-form>
</template>

<script>
import request_json from "../utils/communication";
import dynamicTags from "../components/dynamicTags";
export default {
  components: { dynamicTags },
  name: "PatternConfig",
  data() {
    return {
      target: "",
      backflag: false,
      checkValue: false,
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
    check(bool) {
      this.checkValue = bool
    },
    post_success(bool) {
      if (bool) {
        this.$message({
          message: "编辑成功",
          type: "success",
        });
      } else {
        this.$message({
          message: "编辑失败",
          type: "error",
        });
      }
    },
    cancelchange() {
      this.backflag = !this.backflag
    },
    async submitchange(mytype, Taglist, curTags) {
      var addlist = curTags.filter(x => !Taglist.includes(x))
      var deletelist = Taglist.filter(x => !curTags.includes(x))
      var msg = {
        type: mytype,
        resource: this.target,
        data: addlist,
        operation: "insert",
      };
      await request_json.POST(this.check, msg, "/pattern").then(() => {
        if (!this.checkValue) {
          this.$message({
            message: "编辑失败",
            type: "error",
          });
        } else {
          msg.data = deletelist;
          msg.operation = "delete";
          request_json.POST(this.post_success, msg, "/pattern");
        }
      })
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
