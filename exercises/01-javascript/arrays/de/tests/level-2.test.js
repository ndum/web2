import { readFileSync } from 'node:fs'

import { describe, expect, it } from 'vitest'

import { countByCategory } from '../src/catalog.js'

const items = JSON.parse(readFileSync(new URL('../data/items.json', import.meta.url), 'utf8'))

describe('Vertiefung, Dinge pro Kategorie', () => {
  it('zählt zehn Dinge in jeder der sechs Kategorien', () => {
    expect(countByCategory(items)).toEqual({
      Werkzeug: 10,
      Garten: 10,
      Küche: 10,
      Camping: 10,
      Kinder: 10,
      Feste: 10,
    })
  })

  it('zählt auch eine kleine Liste richtig', () => {
    const shelf = [
      { name: 'Zelt', category: 'Camping' },
      { name: 'Leiter', category: 'Werkzeug' },
      { name: 'Kühlbox', category: 'Camping' },
    ]
    expect(countByCategory(shelf)).toEqual({ Camping: 2, Werkzeug: 1 })
  })

  it('gibt für eine leere Liste ein leeres Objekt zurück', () => {
    expect(countByCategory([])).toEqual({})
  })
})
