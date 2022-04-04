<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <el-menu>
          <el-menu-item-group>
            <el-menu-item index="1">
              <router-link to="/pattern" class="router-link-active"
                ><i class="el-icon-message"></i>模版配置</router-link
              >
            </el-menu-item>
            <el-menu-item index="2">
              <router-link to="/writesetting" class="router-link-active"
                ><i class="el-icon-message"></i>写入描述</router-link
              >
            </el-menu-item>
            <el-menu-item index="3">
              <router-link to="/datamanage" class="router-link-active"
                ><i class="el-icon-message"></i>数据管理</router-link
              >
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
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}

.router-link-active {
  text-decoration: none;
}
</style>
