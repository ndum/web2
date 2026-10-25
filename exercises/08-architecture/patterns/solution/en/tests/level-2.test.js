import { enableAutoUnmount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { toItem } from '@/api/adapter.js'
import { fetchItems } from '@/api/items.js'

import { readSource, showApp, stubThings } from './helpers.js'

enableAutoUnmount(afterEach)
afterEach(() => vi.unstubAllGlobals())

describe('Going further, an adapter for the lending software', () => {
  it('turns a thing of the lending software into an item of the app', () => {
    const thing = { itemId: 4, title: 'Beer bench set', group: 'Parties', depositCents: 4000, returnDate: '2026-11-03' }
    expect(toItem(thing)).toEqual({ id: 4, name: 'Beer bench set', category: 'Parties', deposit: 40, availableFrom: '2026-11-03' })
  })

  it('delivers items in the format of the app with fetchItems', async () => {
    stubThings()
    const items = await fetchItems()
    expect(items).toHaveLength(60)
    expect(items.find((item) => item.id === 6)).toEqual({ id: 6, name: 'Projector', category: 'Parties', deposit: 80, availableFrom: null })
  })

  it('shows the catalog with names and deposits', async () => {
    const wrapper = await showApp()
    const projector = wrapper.findAll('.card').find((card) => card.text().includes('Projector'))
    // Intl writes a no-break space between the currency and the amount
    expect(projector.find('.deposit').text().replace(/\s/g, ' ')).toBe('CHF 80.00')
  })

  it('uses the other format only in the adapter', () => {
    for (const file of ['App.vue', 'components/ItemCard.vue', 'views/CatalogView.vue']) {
      expect(readSource(file)).not.toMatch(/itemId|depositCents|returnDate|\.title\b|\.group\b/)
    }
  })
})
