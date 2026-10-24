import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import ItemCard from '../src/components/ItemCard.vue'

describe('Einstieg, das Pfand auf der Karte', () => {
  it('nimmt das Pfand als Zahl entgegen', () => {
    expect(ItemCard.props?.deposit?.type).toBe(Number)
  })

  it('zeigt das Pfand mit zwei Stellen nach dem Punkt', () => {
    const wrapper = mount(ItemCard, { props: { name: 'Leiter', category: 'Werkzeug', deposit: 20 } })
    expect(wrapper.text()).toContain('Pfand: CHF 20.00')
  })
})