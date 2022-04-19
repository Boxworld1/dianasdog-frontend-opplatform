<template>
  <div>
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="写入目标" prop="target">
        <el-select v-model="form.target" placeholder="请选择写入目标">
          <el-option label="目标一" value="car"></el-option>
          <el-option label="目标二" value="poem"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="描述性文件">
        <el-input type="textarea" v-model="form.setting"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">提交</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import request_json from '@/utils/communication';
export default {
  name: "WriteSetting",
  data() {
    return {
      form: {
        target: "",
        setting: "",
      },
      rules: {
        target: [{ required: true, message: "目标不能为空", trigger: "blur" }],
      },
    };
  },
  methods: {
    check_post(bool) {
      if (bool) {
        alert("查询成功！");
      } else {
        alert("查询失败！");
      }
    },
    onSubmit(form) {
      //todo:与后端通信，提交文件
      this.$refs[form].validate((valid) => {
        if (valid) {
          var setting_json = {
            "word": this.form.target,
            "data": this.form.setting
          }
          request_json.POST(this.check_post, setting_json, '/setting')
          this.form.target = "";
          this.form.setting = "";
        } else {
          this.$message({
            message: "请输入写入目标",
            type: "warning",
          });
          return false;
        }
      });
    },
  },
};
</script>

<style>
</style>
