import { enableAutoUnmount, mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'

import ItemCard from '@/components/ItemCard.vue'

import { readSource, showApp } from './helpers.js'

enableAutoUnmount(afterEach)
afterEach(() => vi.unstubAllGlobals())

const PROPS = { id: 6, name: 'Beamer', category: 'Feste', deposit: 80, favorite: false }

describe('Einstieg, Karte und Container', () => {
  it('zeigt eine Karte nur aus ihren Props, ohne Store', () => {
    const wrapper = mount(ItemCard, { props: PROPS })
    expect(wrapper.text()).toContain('Beamer')
    expect(wrapper.text()).toContain('80.00')
  })

  it('meldet einen Klick auf «Favorit» mit der Nummer des Dings', async () => {
    const wrapper = mount(ItemCard, { props: PROPS })
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('toggle-favorite')).toEqual([[6]])
  })

  it('kennt in der Karte keinen Store', () => {
    expect(readSource('components/ItemCard.vue')).not.toMatch(/stores|pinia/)
  })

  it('zählt im Kopf, was jemand im Katalog markiert', async () => {
    const wrapper = await showApp()
    await wrapper.findAll('.card button')[0].trigger('click')
    expect(wrapper.find('.favorites').text()).toBe('Favoriten: 1')
  })
})
