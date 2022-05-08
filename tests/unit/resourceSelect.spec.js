import { shallowMount } from '@vue/test-utils'
import resourceSelect from '@/components/resourceSelect.vue'

describe('resourceSelect.vue', () => {

  it('check default value', () => {
    const props = shallowMount(resourceSelect).props()
    expect(props.options.length).toBe(0)
    expect(props.get_options).toBeDefined()
  })

  it('renders props.msg when passed', () => {
    const wrapper = shallowMount(resourceSelect, {
      props: {
        options: ["1", "2"]
      }, 
      data() {
        return {
          value: ''
        }
      }
    })
    expect(wrapper.exists()).toBe(true)
    wrapper.vm.$options.watch.value.handler.call(wrapper.vm)
  })
})
