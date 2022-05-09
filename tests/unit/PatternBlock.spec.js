import { shallowMount } from '@vue/test-utils'
import PatternBlock from '@/components/PatternConfig/PatternBlock.vue'

describe('PatternBlock.vue', () => {

  it('check default value', () => {
    const props = shallowMount(PatternBlock).props()
    expect(props.rawpattern.length).toBe(0)
    expect(props.edit).toBeDefined()
    expect(props.deletepattern).toBeDefined()
  })

  it('renders props.msg when passed', () => {
    const wrapper = shallowMount(PatternBlock, {
      props: {
        rawpattern: "hi"
      }
    })
    expect(wrapper.exists()).toBe(true)
    wrapper.vm.handleSelect("edit")
    wrapper.vm.handleSelect("nothing")
  })
})
