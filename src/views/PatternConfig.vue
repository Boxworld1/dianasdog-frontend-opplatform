<template>
  <div>
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="配置目标" prop="target">
        <el-select v-model="form.target" placeholder="请选择配置目标">
          <el-option label="目标一" value="car"></el-option>
          <el-option label="目标二" value="poem"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="模版文件">
        <el-input type="textarea" v-model="form.pattern"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">提交</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "PatternConfig",
  data() {
    return {
      form: {
        target: "",
        pattern: "",
      },
      rules: {
        target: [{ required: true, message: "目标不能为空", trigger: "blur" }],
      },
    };
  },
  methods: {
    onSubmit(form) {
      //todo:与后端通信，提交文件
      this.$refs[form].validate((valid) => {
        if (valid) {
          alert("提交成功！");
          this.form.target = "";
          this.form.pattern = "";
        } else {
          this.$message({
            message: "请输入配置目标",
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
