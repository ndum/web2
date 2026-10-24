import { readFileSync } from 'node:fs'

import { describe, expect, it } from 'vitest'

import { countByCategory } from '../src/catalog.js'

const items = JSON.parse(readFileSync(new URL('../data/items.json', import.meta.url), 'utf8'))

describe('[%Vertiefung, Dinge pro Kategorie|Going further, things per category%]', () => {
  it('[%zählt zehn Dinge in jeder der sechs Kategorien|counts ten things in each of the six categories%]', () => {
    expect(countByCategory(items)).toEqual({
      [%Werkzeug|Tools%]: 10,
      [%Garten|Garden%]: 10,
      [%Küche|Kitchen%]: 10,
      Camping: 10,
      [%Kinder|Kids%]: 10,
      [%Feste|Parties%]: 10,
    })
  })

  it('[%zählt auch eine kleine Liste richtig|counts a small list correctly too%]', () => {
    const shelf = [
      { name: '[%Zelt|Tent%]', category: 'Camping' },
      { name: '[%Leiter|Ladder%]', category: '[%Werkzeug|Tools%]' },
      { name: '[%Kühlbox|Cool box%]', category: 'Camping' },
    ]
    expect(countByCategory(shelf)).toEqual({ Camping: 2, [%Werkzeug|Tools%]: 1 })
  })

  it('[%gibt für eine leere Liste ein leeres Objekt zurück|returns an empty object for an empty list%]', () => {
    expect(countByCategory([])).toEqual({})
  })
})
