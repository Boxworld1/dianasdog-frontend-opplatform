import { shallowMount } from '@vue/test-utils'
import moxios from 'moxios';
import axios from 'axios';
import WScopy from '@/views/WScopy.vue'
import WriteSetting from '@/views/WriteSetting.vue'
import UserManagement from '@/views/UserManagement.vue'
import NotFound from '@/views/NotFound.vue'
import DataManagement from '@/views/DataManagement.vue'


describe('WScopy.vue', () => {
  it('render test', () => {
    const wrapper = shallowMount(WScopy)
    expect(wrapper.exists()).toBe(true)
  })
})

describe('WriteSetting.vue', () => {
  it('render test', () => {
    const wrapper = shallowMount(WriteSetting)
    expect(wrapper.exists()).toBe(true)
    wrapper.vm.upload_succ(true)
    wrapper.vm.uploadFile("myitem")   
  })
})

describe('NotFound.vue', () => {
  it('render test', () => {
    const wrapper = shallowMount(NotFound)
    expect(wrapper.exists()).toBe(true)
  })
})

describe('NotFound.vue', () => {
  it('render test', () => {
    const wrapper = shallowMount(DataManagement)
    expect(wrapper.exists()).toBe(true)
  })
})

describe('UserManagement.vue', () => {
  beforeEach(() => {
    moxios.install(axios);
  });
  afterEach(() => {
    moxios.uninstall(axios);
  });
  it('render test', () => {
    moxios.stubRequest('/alluser', {
      status: 200,
      response: {
        data: [],
      }
    });
    const wrapper = shallowMount(UserManagement)
    expect(wrapper.exists()).toBe(true) 
  })
})

