import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import ItemCard from '../src/components/ItemCard.vue'

describe('[%Einstieg, das Pfand auf der Karte|Getting started, the deposit on the card%]', () => {
  it('[%nimmt das Pfand als Zahl entgegen|takes the deposit as a number%]', () => {
    expect(ItemCard.props?.deposit?.type).toBe(Number)
  })

  it('[%zeigt das Pfand mit zwei Stellen nach dem Punkt|shows the deposit with two decimals%]', () => {
    const wrapper = mount(ItemCard, { props: { name: '[%Leiter|Ladder%]', category: '[%Werkzeug|Tools%]', deposit: 20 } })
    expect(wrapper.text()).toContain('[%Pfand: CHF 20.00|Deposit: CHF 20.00%]')
  })
})