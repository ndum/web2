import { enableAutoUnmount, mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'

import App from '../src/App.vue'
import ItemList from '../src/components/ItemList.vue'

enableAutoUnmount(afterEach)

describe('Einstieg, die Favoriten in App', () => {
  it('zeigt die Zahl der Favoriten in der Kopfzeile', async () => {
    const wrapper = mount(App)
    const buttons = wrapper.findAll('.catalog button.favorite')
    await buttons[0].trigger('click')
    await buttons[5].trigger('click')
    expect(wrapper.find('header').text()).toContain('Favoriten: 2')
    expect(buttons[5].attributes('aria-pressed')).toBe('true')
  })

  it('hält die Favoriten in App und gibt sie der Liste als Prop', async () => {
    const wrapper = mount(App)
    await wrapper.findAll('.catalog button.favorite')[5].trigger('click')
    const list = wrapper.findComponent(ItemList)
    expect(list.props('favorites')).toEqual([6])
    expect(list.emitted('toggle-favorite') ?? list.emitted('toggleFavorite')).toEqual([[6]])
  })
})
