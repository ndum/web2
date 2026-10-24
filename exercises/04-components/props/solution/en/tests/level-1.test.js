import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import ItemCard from '../src/components/ItemCard.vue'

describe('Getting started, the deposit on the card', () => {
  it('takes the deposit as a number', () => {
    expect(ItemCard.props?.deposit?.type).toBe(Number)
  })

  it('shows the deposit with two decimals', () => {
    const wrapper = mount(ItemCard, { props: { name: 'Ladder', category: 'Tools', deposit: 20 } })
    expect(wrapper.text()).toContain('Deposit: CHF 20.00')
  })
})