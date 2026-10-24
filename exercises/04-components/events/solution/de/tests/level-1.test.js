import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import App from '../src/App.vue'
import ItemCard from '../src/components/ItemCard.vue'

const props = { id: 6, name: 'Beamer', category: 'Feste' }

describe('Einstieg, der Knopf zum Reservieren', () => {
  it('meldet beim Klick das Event reserve mit der id', async () => {
    const card = mount(ItemCard, { props })
    const button = card.find('button.reserve')
    expect(button.exists(), 'Ergänze einen button mit der Klasse reserve').toBe(true)
    await button.trigger('click')
    expect(card.emitted('reserve')).toEqual([[6]])
  })

  it('deklariert das Event mit defineEmits', () => {
    const emits = Array.isArray(ItemCard.emits) ? ItemCard.emits : Object.keys(ItemCard.emits ?? {})
    expect(emits).toContain('reserve')
  })

  it('zeigt in App, welches Ding angefragt wurde', async () => {
    const wrapper = mount(App)
    await wrapper.find('button.reserve').trigger('click')
    expect(wrapper.find('.message').text()).toBe('Reservation für Bohrmaschine angefragt.')
  })
})
