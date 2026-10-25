import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import ItemCard from '../src/components/ItemCard.vue'

const props = { name: 'Leiter', category: 'Werkzeug', deposit: 20 }

describe('Vertiefung, wann ein Ding wieder frei ist', () => {
  it('zeigt «Verfügbar», solange availableFrom fehlt', () => {
    const wrapper = mount(ItemCard, { props })
    expect(wrapper.find('.state').text()).toBe('Verfügbar')
  })

  it('zeigt das Datum, ab dem das Ding wieder frei ist', () => {
    const wrapper = mount(ItemCard, { props: { ...props, availableFrom: '2026-11-12' } })
    expect(wrapper.find('.state').text()).toBe('Wieder verfügbar ab 12.11.2026')
  })

  it('passt die Anzeige an, wenn sich die Prop ändert', async () => {
    const wrapper = mount(ItemCard, { props })
    await wrapper.setProps({ availableFrom: '2026-12-01' })
    expect(wrapper.find('.state').text()).toBe('Wieder verfügbar ab 1.12.2026')
  })
})