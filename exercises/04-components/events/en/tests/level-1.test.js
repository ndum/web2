import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import App from '../src/App.vue'
import ItemCard from '../src/components/ItemCard.vue'

const props = { id: 6, name: 'Projector', category: 'Parties' }

describe('Getting started, the button to reserve', () => {
  it('emits the event reserve with the id on a click', async () => {
    const card = mount(ItemCard, { props })
    const button = card.find('button.reserve')
    expect(button.exists(), 'Add a button with the class reserve').toBe(true)
    await button.trigger('click')
    expect(card.emitted('reserve')).toEqual([[6]])
  })

  it('declares the event with defineEmits', () => {
    const emits = Array.isArray(ItemCard.emits) ? ItemCard.emits : Object.keys(ItemCard.emits ?? {})
    expect(emits).toContain('reserve')
  })

  it('shows in App which thing was requested', async () => {
    const wrapper = mount(App)
    await wrapper.find('button.reserve').trigger('click')
    expect(wrapper.find('.message').text()).toBe('Reservation requested for Drill.')
  })
})
