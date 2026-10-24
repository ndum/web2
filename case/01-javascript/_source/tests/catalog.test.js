import { readFileSync } from 'node:fs'

import { describe, expect, it } from 'vitest'

import { addCopies, createFilter, lend } from '../src/index.js'

const items = JSON.parse(readFileSync(new URL('../data/items.json', import.meta.url), 'utf8'))

describe('[%Neue Dinge, Ausleihen und Filter|New things, loans and filters%]', () => {
  it('[%gibt jeder Kopie eines neuen Dings eigene Daten|gives every copy of a new thing data of its own%]', () => {
    const catalog = structuredClone(items)
    addCopies(catalog, { name: '[%Zelt für vier Personen|Tent for four%]', availableFrom: null, parts: ['[%Heringe|Pegs%]'] }, 2)
    expect(catalog.slice(-2).map((item) => item.id)).toEqual([61, 62])
    catalog[60].parts.push('[%Plane|Tarp%]')
    expect(catalog[61].parts).toEqual(['[%Heringe|Pegs%]'])
  })

  it('[%ändert beim Ausleihen nur das ausgeliehene Ding|changes only the lent thing when lending%]', () => {
    const after = lend(items, 1, '2026-11-14')
    expect(after[0].availableFrom).toBe('2026-11-14')
    expect(items[0].availableFrom).toBeNull()
    expect(after.slice(1)).toEqual(items.slice(1))
  })

  it('[%filtert nach Kategorie, Suchtext und Verfügbarkeit|filters by category, search text and availability%]', () => {
    const found = items.filter(createFilter({ category: '[%Werkzeug|Tools%]', query: '[%säge|saw%]', onlyAvailable: true }))
    expect(found.map((item) => item.id)).toEqual([5, 15])
  })
})
