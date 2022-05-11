import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import Vuex from 'vuex'
import store from './store'

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)

Vue.prototype.axios = axios

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  let isLogin = sessionStorage.getItem('isLogin');

  if (to.path == '/logout') {
    sessionStorage.clear();
    next({path: '/userlogin'});
  } else if (to.path=='/userlogin'){
    if (isLogin != null) {
      next({ path: '/home' });
    }
  } else if(isLogin == null) {
    next({path: '/userlogin'});
  }

  next();
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
}).$mount('#app')
