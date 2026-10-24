import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import App from '../src/App.vue'
import ItemCard from '../src/components/ItemCard.vue'

const props = { id: 6, name: 'Beamer', category: 'Feste' }

describe('Knobelei, die Favoriten', () => {
  it('meldet beim Klick auf Favorit das Event toggleFavorite mit der id', async () => {
    const card = mount(ItemCard, { props })
    const button = card.find('button.favorite')
    expect(button.exists(), 'Ergänze einen button mit der Klasse favorite').toBe(true)
    await button.trigger('click')
    expect(card.emitted('toggleFavorite')).toEqual([[6]])
  })

  it('zeigt mit aria-pressed, ob das Ding ein Favorit ist', () => {
    expect(mount(ItemCard, { props: { ...props, favorite: true } }).find('button.favorite').attributes('aria-pressed')).toBe('true')
    expect(mount(ItemCard, { props }).find('button.favorite').attributes('aria-pressed')).toBe('false')
  })

  it('zählt die Favoriten in App', async () => {
    const wrapper = mount(App)
    const buttons = wrapper.findAll('button.favorite')
    await buttons[0].trigger('click')
    await buttons[1].trigger('click')
    expect(wrapper.find('.favorites').text()).toBe('2 Favoriten')
    expect(buttons[0].attributes('aria-pressed')).toBe('true')
    await buttons[0].trigger('click')
    expect(wrapper.find('.favorites').text()).toBe('1 Favorit')
    expect(wrapper.findAllComponents(ItemCard)[0].props('favorite')).toBe(false)
  })
})
