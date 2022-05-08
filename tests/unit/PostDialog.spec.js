import { shallowMount } from '@vue/test-utils'
import PostDialog from '@/components/PatternConfig/PostDialog.vue'

describe('EditDialog.vue', () => {

  it('check default value', () => {
    const props = shallowMount(PostDialog).props()
    expect(props.dialogVisible).toBe(true)
    expect(props.target.length).toBe(0)
    expect(props.cancelPost).toBeDefined()
    expect(props.postpattern).toBeDefined()
  })

  it('renders props.msg when passed', () => {
    const wrapper = shallowMount(PostDialog, {
      props: {
        dialogVisible: true,
        target: "hi",
      },
      data() {
        return {
          visible: false,
          rawpattern: "",
        }
      }
    })
    expect(wrapper.exists()).toBe(true)
    wrapper.vm.$options.watch.dialogVisible.call(wrapper.vm)
  })

})
