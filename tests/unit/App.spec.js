import { shallowMount } from '@vue/test-utils'
import App from '@/App.vue'
import routes from "@/router/index.js";
import store from "@/store/index.js";
import admin from "@/store/modules/admin.js";
import user from "@/store/modules/user.js";
describe('App.vue', () => {

  it('renders props.msg when passed', () => {
    const wrapper = shallowMount(App, {
      global: {
        mocks: {
          $store: store,
          $router: routes,
          $admin: admin,
          $user: user,
        }
      }
    })
    expect(wrapper.exists()).toBe(true)
    // wrapper.vm.saveState()
  })

})
