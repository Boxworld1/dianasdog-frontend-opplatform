import { shallowMount } from '@vue/test-utils'
import EditDialog from '@/components/PatternConfig/EditDialog.vue'

describe('EditDialog.vue', () => {

  it('check default value', () => {
    const props = shallowMount(EditDialog).props()
    expect(props.dialogVisible).toBe(true)
    expect(props.target.length).toBe(0)
    expect(props.cancelEdit).toBeDefined()
    expect(props.editpattern).toBeDefined()
  })

  it('renders props.msg when passed', () => {
    const wrapper = shallowMount(EditDialog, {
      props: {
        dialogVisible: true,
        target: "hi",
        rawpattern: "by",
      }
    })
    expect(wrapper.exists()).toBe(true)
  })
})
