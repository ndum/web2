import { readFileSync } from 'node:fs'

import { describe, expect, it } from 'vitest'

import { countByCategory } from '../src/catalog.js'

const items = JSON.parse(readFileSync(new URL('../data/items.json', import.meta.url), 'utf8'))

describe('Going further, things per category', () => {
  it('counts ten things in each of the six categories', () => {
    expect(countByCategory(items)).toEqual({
      Tools: 10,
      Garden: 10,
      Kitchen: 10,
      Camping: 10,
      Kids: 10,
      Parties: 10,
    })
  })

  it('counts a small list correctly too', () => {
    const shelf = [
      { name: 'Tent', category: 'Camping' },
      { name: 'Ladder', category: 'Tools' },
      { name: 'Cool box', category: 'Camping' },
    ]
    expect(countByCategory(shelf)).toEqual({ Camping: 2, Tools: 1 })
  })

  it('returns an empty object for an empty list', () => {
    expect(countByCategory([])).toEqual({})
  })
})
