import { enableAutoUnmount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { sorters } from '@/sorters.js'

import { showApp } from './helpers.js'

enableAutoUnmount(afterEach)
afterEach(() => vi.unstubAllGlobals())

const names = (wrapper) => wrapper.findAll('.card strong').map((name) => name.text())

describe('Knobelei, Strategien fürs Sortieren', () => {
  it('kennt die Strategien Name, Pfand und Verfügbarkeit', () => {
    expect(Object.keys(sorters)).toEqual(['name', 'deposit', 'availability'])
    for (const sorter of Object.values(sorters)) {
      expect(sorter.label).toBeTypeOf('string')
      expect(sorter.compare).toBeTypeOf('function')
    }
  })

  it('baut das Menü aus den Strategien', async () => {
    const wrapper = await showApp()
    expect(wrapper.findAll('#sort option').map((option) => option.text())).toEqual(Object.values(sorters).map((sorter) => sorter.label))
  })

  it('nimmt eine neue Strategie auf, ohne dass sich die Vorlage ändert', async () => {
    sorters.reverse = { label: 'Name rückwärts', compare: (a, b) => sorters.name.compare(b, a) }
    try {
      const wrapper = await showApp()
      await wrapper.find('#sort').setValue('reverse')
      expect(names(wrapper)[0]).toBe('Zelt für zwei Personen')
    } finally {
      delete sorters.reverse
    }
  })

  it('zeigt nach Verfügbarkeit zuerst, was da ist', async () => {
    const wrapper = await showApp()
    await wrapper.find('#sort').setValue('availability')
    const last = names(wrapper).at(-1)
    expect(last).toBe('Partyzelt')
  })
})
