<template>
  <div>
    <el-form
      ref="form"
      :rules="rules"
      :model="form"
      class="login-box"
      @keyup.enter.native="onSubmit('form')"
    >
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
import bcrypt from 'bcryptjs'
import request_json from '../utils/communication'
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
          { min: 3, max: 25, message: "密码字符数在3-25间", trigger: "blur" },
        ],
      },
      passwdValid: false,
    };
  },
  methods: {
    back_check(val) {
      if (val === false){
        this.passwdValid = false;
      } else {
        bcrypt.compare(this.form.password, val, (err, res) => {
            this.passwdValid = res;
        });
      }
    },
    // check() {
    //   var json = this.$store.getters.getAdmin;
    //   for (var p in json){
    //     if (p  === this.form.name) {
    //       if (json[p] === this.form.password)
    //         return true;
    //       else return false;
    //     }
    //   }
    //   return false;
    // },
    async check_pass() {
      var user = {
        "username": this.form.name,
      }
      request_json.POST_User(this.back_check, user);
    },
    async onSubmit(form) {
      await this.check_pass();
      setTimeout(() => {
      this.$refs[form].validate((valid) => {
        if (valid && this.passwdValid) {
          sessionStorage.setItem("isLogin", "true");
          this.$store.dispatch("asyncUpdateUser", { name: this.form.name });
          this.$router.push({ name: "home" });
        } else {
          this.$message({
            message: "用户名或密码错误",
            type: "warning",
          });
          return false;
        }
      });
      },500)
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
