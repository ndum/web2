import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import App from '../src/App.vue'
import ItemCard from '../src/components/ItemCard.vue'

const props = { id: 6, name: '[%Beamer|Projector%]', category: '[%Feste|Parties%]' }

describe('[%Einstieg, der Knopf zum Reservieren|Getting started, the button to reserve%]', () => {
  it('[%meldet beim Klick das Event reserve mit der id|emits the event reserve with the id on a click%]', async () => {
    const card = mount(ItemCard, { props })
    const button = card.find('button.reserve')
    expect(button.exists(), '[%Ergänze einen button mit der Klasse reserve|Add a button with the class reserve%]').toBe(true)
    await button.trigger('click')
    expect(card.emitted('reserve')).toEqual([[6]])
  })

  it('[%deklariert das Event mit defineEmits|declares the event with defineEmits%]', () => {
    const emits = Array.isArray(ItemCard.emits) ? ItemCard.emits : Object.keys(ItemCard.emits ?? {})
    expect(emits).toContain('reserve')
  })

  it('[%zeigt in App, welches Ding angefragt wurde|shows in App which thing was requested%]', async () => {
    const wrapper = mount(App)
    await wrapper.find('button.reserve').trigger('click')
    expect(wrapper.find('.message').text()).toBe('[%Reservation für Bohrmaschine angefragt.|Reservation requested for Drill.%]')
  })
})
