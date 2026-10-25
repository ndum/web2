import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import App from '../src/App.vue'

describe('Einstieg, der Zähler der Favoriten', () => {
  it('zählt neue Favoriten im Kopf mit', async () => {
    const wrapper = mount(App)
    const counter = wrapper.find('.favorites')
    expect(counter.text()).toBe('0 Favoriten')
    await wrapper.findAll('.favorite')[0].trigger('click')
    expect(counter.text()).toBe('1 Favorit')
    await wrapper.findAll('.favorite')[1].trigger('click')
    expect(counter.text()).toBe('2 Favoriten')
  })

  it('zählt einen entfernten Favoriten nicht mehr', async () => {
    const wrapper = mount(App)
    const buttons = wrapper.findAll('.favorite')
    await buttons[0].trigger('click')
    await buttons[1].trigger('click')
    await buttons[0].trigger('click')
    expect(wrapper.find('.favorites').text()).toBe('1 Favorit')
  })
})
