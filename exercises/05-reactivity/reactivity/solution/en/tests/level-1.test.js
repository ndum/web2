import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import App from '../src/App.vue'

describe('Getting started, the counter of favorites', () => {
  it('counts new favorites in the header', async () => {
    const wrapper = mount(App)
    const counter = wrapper.find('.favorites')
    expect(counter.text()).toBe('0 favorites')
    await wrapper.findAll('.favorite')[0].trigger('click')
    expect(counter.text()).toBe('1 favorite')
    await wrapper.findAll('.favorite')[1].trigger('click')
    expect(counter.text()).toBe('2 favorites')
  })

  it('stops counting a removed favorite', async () => {
    const wrapper = mount(App)
    const buttons = wrapper.findAll('.favorite')
    await buttons[0].trigger('click')
    await buttons[1].trigger('click')
    await buttons[0].trigger('click')
    expect(wrapper.find('.favorites').text()).toBe('1 favorite')
  })
})
