import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import ItemCard from '../src/components/ItemCard.vue'

const props = { name: 'Ladder', category: 'Tools', deposit: 20 }

describe('Going further, when a thing is free again', () => {
  it('shows "Available" while availableFrom is missing', () => {
    const wrapper = mount(ItemCard, { props })
    expect(wrapper.find('.state').text()).toBe('Available')
  })

  it('shows the date from which the thing is free again', () => {
    const wrapper = mount(ItemCard, { props: { ...props, availableFrom: '2026-11-12' } })
    expect(wrapper.find('.state').text()).toBe('Available again from 11/12/2026')
  })

  it('updates the text when the prop changes', async () => {
    const wrapper = mount(ItemCard, { props })
    await wrapper.setProps({ availableFrom: '2026-12-01' })
    expect(wrapper.find('.state').text()).toBe('Available again from 12/1/2026')
  })
})