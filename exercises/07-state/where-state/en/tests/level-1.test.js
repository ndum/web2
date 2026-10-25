import { enableAutoUnmount, mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'

import App from '../src/App.vue'
import ItemList from '../src/components/ItemList.vue'

enableAutoUnmount(afterEach)

describe('Getting started, the favorites in App', () => {
  it('shows the number of favorites in the header', async () => {
    const wrapper = mount(App)
    const buttons = wrapper.findAll('.catalog button.favorite')
    await buttons[0].trigger('click')
    await buttons[5].trigger('click')
    expect(wrapper.find('header').text()).toContain('Favorites: 2')
    expect(buttons[5].attributes('aria-pressed')).toBe('true')
  })

  it('keeps the favorites in App and passes them to the list as a prop', async () => {
    const wrapper = mount(App)
    await wrapper.findAll('.catalog button.favorite')[5].trigger('click')
    const list = wrapper.findComponent(ItemList)
    expect(list.props('favorites')).toEqual([6])
    expect(list.emitted('toggle-favorite') ?? list.emitted('toggleFavorite')).toEqual([[6]])
  })
})
