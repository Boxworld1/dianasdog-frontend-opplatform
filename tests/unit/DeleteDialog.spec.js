import { shallowMount } from '@vue/test-utils'
import DeleteDialog from '@/components/PatternConfig/DeleteDialog.vue'

describe('DeleteDialog.vue', () => {

  it('check default value', () => {
    const props = shallowMount(DeleteDialog).props()
    expect(props.dialogVisible).toBe(true)
    expect(props.target.length).toBe(0)
    expect(props.patternList.length).toBe(1)
    expect(props.cancelDelete).toBeDefined()
    expect(props.deletepattern).toBeDefined()
  })

  it('renders props.msg when passed', () => {
    const wrapper = shallowMount(DeleteDialog, {
      props: {
        dialogVisible: true,
        target: "hi",
        patternList: ["udf"],
      }
    })
    expect(wrapper.exists()).toBe(true)
  })
})
