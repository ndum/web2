import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import App from '../src/App.vue'
import ItemCard from '../src/components/ItemCard.vue'

const props = { id: 6, name: '[%Beamer|Projector%]', category: '[%Feste|Parties%]' }

describe('[%Knobelei, die Favoriten|Challenge, the favorites%]', () => {
  it('[%meldet beim Klick auf Favorit das Event toggleFavorite mit der id|emits toggleFavorite with the id on a click on favorite%]', async () => {
    const card = mount(ItemCard, { props })
    const button = card.find('button.favorite')
    expect(button.exists(), '[%Ergänze einen button mit der Klasse favorite|Add a button with the class favorite%]').toBe(true)
    await button.trigger('click')
    expect(card.emitted('toggleFavorite')).toEqual([[6]])
  })

  it('[%zeigt mit aria-pressed, ob das Ding ein Favorit ist|shows with aria-pressed whether the thing is a favorite%]', () => {
    expect(mount(ItemCard, { props: { ...props, favorite: true } }).find('button.favorite').attributes('aria-pressed')).toBe('true')
    expect(mount(ItemCard, { props }).find('button.favorite').attributes('aria-pressed')).toBe('false')
  })

  it('[%zählt die Favoriten in App|counts the favorites in App%]', async () => {
    const wrapper = mount(App)
    const buttons = wrapper.findAll('button.favorite')
    await buttons[0].trigger('click')
    await buttons[1].trigger('click')
    expect(wrapper.find('.favorites').text()).toBe('[%2 Favoriten|2 favorites%]')
    expect(buttons[0].attributes('aria-pressed')).toBe('true')
    await buttons[0].trigger('click')
    expect(wrapper.find('.favorites').text()).toBe('[%1 Favorit|1 favorite%]')
    expect(wrapper.findAllComponents(ItemCard)[0].props('favorite')).toBe(false)
  })
})
