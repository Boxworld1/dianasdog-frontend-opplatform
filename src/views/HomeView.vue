<template>
  <div>
    <el-container>
      <el-aside width="200px" style="height:100vh">
        <el-menu
        class="el-menu-vertical-demo"
        text-color="#1b3554"
        active-text-color="#409eff"
        style="height:100vh"
        router>
          <el-menu-item>
            <span slot="title">
              特型卡片运营平台
            </span>
            </el-menu-item>
          <el-menu-item-group>
            <el-menu-item index="/configpattern">
              <i class="el-icon-setting"></i>模版配置
            </el-menu-item>
            <el-menu-item index="/writesetting">
              <i class="el-icon-document"></i>写入描述
            </el-menu-item>
            <el-menu-item index="/managedata">
              <i class="el-icon-s-data"></i>数据管理
            </el-menu-item>
            <el-menu-item index="/managedict">
              <i class="el-icon-menu"></i>词表管理
            </el-menu-item>
            <el-menu-item index="/usermanage">
              <i class="el-icon-user"></i>用户管理
            </el-menu-item>
          </el-menu-item-group>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <el-dropdown>
            <i class="el-icon-user" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span style="margin-right: 15px">{{ $store.getters.getUser.name }}</span>
        </el-header>

        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import request_json from '../utils/communication'
import user from '../store/modules/user.js'
export default {
  name: "HomeView",
  components: {},

  data() {
    var level = 0;
    var username = "";
    return {
      level,
      username,
    }
  },
  methods: {
    logout() {
      this.$router.push('/logout');
    },
    setLevel(val) {
      console.log(val);
      this.level = val;
      console.log(this.level);
      if (this.level == 3) {
        document.getElementById("usermanage").removeAttribute("hidden");
      }
    }
  },
  mounted() {
    console.log(this.level);
    this.username = user.state.user.name;
    var user1 = {
      "username": this.username,
    }
    request_json.POST_Userlevel(this.setLevel, user1);
    console.log(this.level)


  }
};
</script>

<style>
.platform-title {
  color: #333;
  line-height: 60px;

}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
  background-color: #fff;
}

.el-menu-vertical-demo {
  background-color: #b3c0d1;
  text-decoration-color: #fff;
}

.router-link-active {
  text-decoration: none;
}
</style>
