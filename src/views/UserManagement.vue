<template>
  <div>
    <div>
      <el-table :data="users" style="width: 100%" height="600">
        <el-table-column fixed prop="name" label="用户名" width="200" />
        <el-table-column prop="password" label="用户密码">
        </el-table-column>
        <el-table-column prop="level" label="权限等级" align="right">
        </el-table-column>
        <el-table-column label="操作" align="right">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index)">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>




    <div class="foot">
      <template>
        <el-button type="primary" @click="dialogLabelVisible = true">增加用户</el-button>

      </template>
    </div>







    <el-dialog title="增加用户" :visible.sync="dialogLabelVisible">
      <el-form ref="form" :rules="rules" :model="form" class="login-box" @keyup.enter.native="onSubmit('form')">
        <h3 class="login-title">注册</h3>
        <el-form-item label="用户名" prop="name">
          <el-input type="text" placeholder="请输入用户名" v-model="form.name" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" placeholder="请输入密码" v-model="form.password" />
        </el-form-item>
        <el-form-item label="权限等级" prop="level">
          <el-input type="level" placeholder="请输入权限等级" v-model="form.level" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogLabelVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitDialogLabel">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import request_json from "../utils/communication";
import bcrypt from 'bcryptjs';
export default {
  name: "UserManagement",
  data() {
    return {
      form: {
        name: "",
        password: "",
        level: "",
      },
      rules: {
        name: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 3, max: 25, message: "密码字符数在3-25间", trigger: "blur" },
        ],
      },

      users: [],
      dialogLabelVisible: false,
      dialogResourceVisible: false,
      //formLabel用于新增label
      //   formLabel: {
      //     name: "",
      //     es: true,
      //     redis: true,
      //     sql: true,
      //     pic: true,
      //   },
      //   newResourceName: "",
    };
  },
  methods: {
    // get_options(bool) {
    //   if (bool) {
    //     var url = "/category";
    //     request_json.GET(this.set_options, url);
    //     console.log("aaa");
    //   }
    // },
    // set_options(val) {
    //   this.options = val.data;
    // },
    // changeValue(value) {
    //   this.value_option = value;
    // },
    delete(val) {
      console.log(val);
    },


    set_users(val) {
      console.log(val)
      this.users = [];
      for (var item in val.data) {
        console.log(val.data[item])
        //   var user1 = {name: item.name, password: item.password, level: item.level}
        //   console.log(user1)
        this.users.push(val.data[item])
      }
      console.log(this.users)
    },
    //do: convert val to list items
    handleDelete(index) {
      console.log(index);
      request_json.POST(this.delete, { username: this.users[index].name }, "/userdelete");
      this.users.splice(index, 1);
      console.log(index);
      console.log(this.users[index].name);

    },



    resetFormLabel() {
      this.form = {
        name: "",
        password: "",
        level: "",
      };
    },
    submitDialogLabel() {
      this.dialogLabelVisible = false;
      this.form.password = bcrypt.hashSync(this.form.password, 10);
      this.users.push(this.form);
      request_json.POST(this.delete, { username: this.form.name, userpassword: this.form.password, userlevel: this.form.level }, "/useradd");
      this.resetFormLabel();
    },
    submit_check(bool) {
      if (bool) {
        alert("更改成功！");
      } else {
        alert("更改失败！");
      }
    },
  },



  mounted() {
    var url = "/alluser";
    request_json.GET(this.set_users, url);
  },







};
</script>

<style>
.foot {
  margin-top: 20px;
}
</style>
