import { enableAutoUnmount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { toItem } from '@/api/adapter.js'
import { fetchItems } from '@/api/items.js'

import { readSource, showApp, stubThings } from './helpers.js'

enableAutoUnmount(afterEach)
afterEach(() => vi.unstubAllGlobals())

describe('[%Vertiefung, ein Adapter für die Ausleihsoftware|Going further, an adapter for the lending software%]', () => {
  it('[%übersetzt ein Ding der Ausleihsoftware in ein Ding der App|turns a thing of the lending software into an item of the app%]', () => {
    const thing = { itemId: 4, title: '[%Festbankgarnitur|Beer bench set%]', group: '[%Feste|Parties%]', depositCents: 4000, returnDate: '2026-11-03' }
    expect(toItem(thing)).toEqual({ id: 4, name: '[%Festbankgarnitur|Beer bench set%]', category: '[%Feste|Parties%]', deposit: 40, availableFrom: '2026-11-03' })
  })

  it('[%liefert mit fetchItems Dinge im Format der App|delivers items in the format of the app with fetchItems%]', async () => {
    stubThings()
    const items = await fetchItems()
    expect(items).toHaveLength(60)
    expect(items.find((item) => item.id === 6)).toEqual({ id: 6, name: '[%Beamer|Projector%]', category: '[%Feste|Parties%]', deposit: 80, availableFrom: null })
  })

  it('[%zeigt den Katalog mit Namen und Pfand|shows the catalog with names and deposits%]', async () => {
    const wrapper = await showApp()
    const projector = wrapper.findAll('.card').find((card) => card.text().includes('[%Beamer|Projector%]'))
    // Intl writes a no-break space between the currency and the amount
    expect(projector.find('.deposit').text().replace(/\s/g, ' ')).toBe('CHF 80.00')
  })

  it('[%verwendet das fremde Format nur im Adapter|uses the other format only in the adapter%]', () => {
    for (const file of ['App.vue', 'components/ItemCard.vue', 'views/CatalogView.vue']) {
      expect(readSource(file)).not.toMatch(/itemId|depositCents|returnDate|\.title\b|\.group\b/)
    }
  })
})
