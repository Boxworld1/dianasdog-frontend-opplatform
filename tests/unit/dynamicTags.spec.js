import {
  shallowMount
} from '@vue/test-utils'
import dynamicTags from '@/components/dynamicTags.vue'

describe('resourceSelect.vue', () => {

  it('check default value', () => {
    const props = shallowMount(dynamicTags).props()
    expect(props.type.length).toBe(0)
    expect(props.Taglist.length).toBe(0)
  })

  it('renders primary', () => {
    const wrapper = shallowMount(dynamicTags, {
      props: {
        type: "primary",
      },
      data() {
        return {
          curTags: [],
          types: ["", "success", "info", "warning", "danger"],
          inputVisible: false,
          inputValue: "myinput",
        }
      }
    })
    expect(wrapper.exists()).toBe(true)
    wrapper.vm.handleClose(true)
    wrapper.vm.showInput()
    wrapper.vm.handleInputConfirm()
  })

  it('renders pattern', () => {
    const wrapper = shallowMount(dynamicTags, {
      props: {
        type: "pattern",
      },
    })
    expect(wrapper.exists()).toBe(true)
    wrapper.vm.handleClose(true)
    wrapper.vm.showInput()
    wrapper.vm.handleInputConfirm()
    wrapper.vm.$options.watch.backflag.call(wrapper.vm)
  })
})