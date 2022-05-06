<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <el-menu
        class="el-munu-vertical-demo"
        background-color="#1b3554"
        text-color="#fff"
        active-text-color="#409eff"
        router>
          <el-menu-item>
            <span slot="title">
              运营平台
            </span>
            </el-menu-item>
          <el-menu-item-group>
            <el-menu-item index="/configpattern">
              <i class="el-icon-message"></i>模版配置
            </el-menu-item>
            <el-menu-item index="/writesetting">
              <i class="el-icon-message"></i>写入描述
            </el-menu-item>
            <el-menu-item index="/managedata">
             <i class="el-icon-message"></i>数据管理
            </el-menu-item>
          </el-menu-item-group>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="logout">注销</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>{{ $store.getters.getUser.name }}</span>
        </el-header>

        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  components: {},
  methods: {
    logout() {
      this.$router.push('/logout');
    }
  },
};
</script>

<style>
.platform-title{
  background-color: #b3c0d1;
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
}

.el-munu-vertical-demo {
  background-color: #1b3554;
  text-decoration-color: #fff;
}

.router-link-active {
  text-decoration: none;
}
</style>
