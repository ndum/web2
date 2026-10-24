import { readFileSync } from 'node:fs'

import { describe, expect, it } from 'vitest'

import { addCopies, createFilter, lend } from '../src/index.js'

const items = JSON.parse(readFileSync(new URL('../data/items.json', import.meta.url), 'utf8'))

describe('Neue Dinge, Ausleihen und Filter', () => {
  it('gibt jeder Kopie eines neuen Dings eigene Daten', () => {
    const catalog = structuredClone(items)
    addCopies(catalog, { name: 'Zelt für vier Personen', availableFrom: null, parts: ['Heringe'] }, 2)
    expect(catalog.slice(-2).map((item) => item.id)).toEqual([61, 62])
    catalog[60].parts.push('Plane')
    expect(catalog[61].parts).toEqual(['Heringe'])
  })

  it('ändert beim Ausleihen nur das ausgeliehene Ding', () => {
    const after = lend(items, 1, '2026-11-14')
    expect(after[0].availableFrom).toBe('2026-11-14')
    expect(items[0].availableFrom).toBeNull()
    expect(after.slice(1)).toEqual(items.slice(1))
  })

  it('filtert nach Kategorie, Suchtext und Verfügbarkeit', () => {
    const found = items.filter(createFilter({ category: 'Werkzeug', query: 'säge', onlyAvailable: true }))
    expect(found.map((item) => item.id)).toEqual([5, 15])
  })
})
