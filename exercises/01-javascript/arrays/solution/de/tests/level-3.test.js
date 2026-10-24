import { readFileSync } from 'node:fs'

import { describe, expect, it } from 'vitest'

import { createFilter } from '../src/catalog.js'

const items = JSON.parse(readFileSync(new URL('../data/items.json', import.meta.url), 'utf8'))
const names = (criteria) => items.filter(createFilter(criteria)).map((item) => item.name)

describe('Knobelei, ein Filter aus Kriterien', () => {
  it('gibt eine Funktion zurück, die filter verwenden kann', () => {
    expect(createFilter({})).toBeTypeOf('function')
  })

  it('filtert nach Kategorie', () => {
    expect(names({ category: 'Garten' })).toHaveLength(10)
  })

  it('sucht im Namen ohne Rücksicht auf Gross- und Kleinschreibung', () => {
    expect(names({ query: 'SÄGE' })).toEqual(['Stichsäge', 'Kreissäge'])
  })

  it('zeigt mit onlyAvailable nur Dinge, die da sind', () => {
    expect(names({ category: 'Camping', onlyAvailable: true })).toHaveLength(8)
  })

  it('verbindet alle Kriterien', () => {
    expect(names({ category: 'Werkzeug', query: 'schrauber', onlyAvailable: true })).toEqual([])
    expect(names({ category: 'Werkzeug', query: 'schrauber' })).toEqual(['Akkuschrauber'])
  })
})
