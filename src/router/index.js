import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginPage from '../views/LoginPage.vue'
import PatternConfig from '../views/PatternConfig.vue'
import WriteSetting from '../views/WriteSetting.vue'
import DataManagement from '../views/DataManagement.vue'
import NotFound from '../views/NotFound.vue'

Vue.use(VueRouter)

const routes = [
  {
    //首页
    path: '/home',
    name: 'home',
    component: HomeView,
    children:[
      {
        //模版配置
        path: '/pattern',
        name: 'PatternConfig',
        component: PatternConfig
      },
      {
        //写入行为描述
        path: '/writesetting',
        name: 'WriteSetting',
        component: WriteSetting
      },
      {
        //数据管理
        path: '/datamanage',
        name: 'DataManagement',
        component: DataManagement
      }
    ]
  },
  {
    //登录页
    path: '/login',
    name: 'LoginPage',
    component: LoginPage,
  },
  {
    path: '*',
    component: NotFound,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
