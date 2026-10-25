import { enableAutoUnmount, mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'

import ItemCard from '@/components/ItemCard.vue'

import { readSource, showApp } from './helpers.js'

enableAutoUnmount(afterEach)
afterEach(() => vi.unstubAllGlobals())

const PROPS = { id: 6, name: 'Projector', category: 'Parties', deposit: 80, favorite: false }

describe('Getting started, card and container', () => {
  it('shows a card from its props alone, without a store', () => {
    const wrapper = mount(ItemCard, { props: PROPS })
    expect(wrapper.text()).toContain('Projector')
    expect(wrapper.text()).toContain('80.00')
  })

  it('reports a click on "Favorite" with the number of the thing', async () => {
    const wrapper = mount(ItemCard, { props: PROPS })
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('toggle-favorite')).toEqual([[6]])
  })

  it('knows no store in the card', () => {
    expect(readSource('components/ItemCard.vue')).not.toMatch(/stores|pinia/)
  })

  it('counts in the header what someone marks in the catalog', async () => {
    const wrapper = await showApp()
    await wrapper.findAll('.card button')[0].trigger('click')
    expect(wrapper.find('.favorites').text()).toBe('Favorites: 1')
  })
})
