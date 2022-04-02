import { shallowMount } from '@vue/test-utils'
import LoginPage from '@/views/LoginPage.vue'

describe('LoginPage.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = ''
    const wrapper = shallowMount(LoginPage, {
      props: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
