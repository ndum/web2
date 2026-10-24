import { readFileSync } from 'node:fs'

import { describe, expect, it } from 'vitest'

import { addCopies, createFilter, lend } from '../src/index.js'

const items = JSON.parse(readFileSync(new URL('../data/items.json', import.meta.url), 'utf8'))

describe('New things, loans and filters', () => {
  it('gives every copy of a new thing data of its own', () => {
    const catalog = structuredClone(items)
    addCopies(catalog, { name: 'Tent for four', availableFrom: null, parts: ['Pegs'] }, 2)
    expect(catalog.slice(-2).map((item) => item.id)).toEqual([61, 62])
    catalog[60].parts.push('Tarp')
    expect(catalog[61].parts).toEqual(['Pegs'])
  })

  it('changes only the lent thing when lending', () => {
    const after = lend(items, 1, '2026-11-14')
    expect(after[0].availableFrom).toBe('2026-11-14')
    expect(items[0].availableFrom).toBeNull()
    expect(after.slice(1)).toEqual(items.slice(1))
  })

  it('filters by category, search text and availability', () => {
    const found = items.filter(createFilter({ category: 'Tools', query: 'saw', onlyAvailable: true }))
    expect(found.map((item) => item.id)).toEqual([5, 15])
  })
})
