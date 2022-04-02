import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginPage from '../views/LoginPage.vue'
import RedisManagement from '../views/redis/RedisManagement.vue'
import RedisCheck from '../views/redis/RedisCheck.vue'
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
        //redis数据管理
        path: '/redis/management',
        name: 'RedisManagement',
        component: RedisManagement
      },
      {
        //redis数据查看
        path: '/redis/check',
        name: 'RedisCheck',
        component: RedisCheck
      },
    ]
  },
  {
    //登录页
    path: '/login',
    name: 'LoginPage',
    component: LoginPage,
    props: true
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
