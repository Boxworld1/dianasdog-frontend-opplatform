<template>
  <div>
    <el-form ref="form" :rules="rules" :model="form" class="login-box" @keyup.enter.native="onSubmit('form')">
      <h3 class="login-title">欢迎登录</h3>
      <el-form-item label="用户名" prop="name">
        <el-input type="text" placeholder="请输入用户名" v-model="form.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          placeholder="请输入密码"
          v-model="form.password"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "LoginPage",
  data() {
    return {
      form: {
        name: "",
        password: "",
      },
      rules: {
        name: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 25, message: "密码字符数在6-25间", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    onSubmit(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          sessionStorage.setItem('isLogin','true');
          this.$store.dispatch("asyncUpdateUser", {name: this.form.name});
          this.$router.push({name: "home", params:{name: this.form.name}});
        } else {
          this.$message({
            message: "用户名或密码错误",
            type: "warning"
          });
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
.login-box {
  width: 350px;
  margin: 150px auto;
  border: 1px solid #dcdfe6;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 30px #dcdfe6;
}
.login-title {
  text-align: center;
}
</style>
