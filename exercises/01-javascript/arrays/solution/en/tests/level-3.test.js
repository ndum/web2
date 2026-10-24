import { readFileSync } from 'node:fs'

import { describe, expect, it } from 'vitest'

import { createFilter } from '../src/catalog.js'

const items = JSON.parse(readFileSync(new URL('../data/items.json', import.meta.url), 'utf8'))
const names = (criteria) => items.filter(createFilter(criteria)).map((item) => item.name)

describe('Challenge, a filter built from criteria', () => {
  it('returns a function that filter can use', () => {
    expect(createFilter({})).toBeTypeOf('function')
  })

  it('filters by category', () => {
    expect(names({ category: 'Garden' })).toHaveLength(10)
  })

  it('searches the name regardless of case', () => {
    expect(names({ query: 'SAW' })).toEqual(['Jigsaw', 'Circular saw'])
  })

  it('shows only things that are in with onlyAvailable', () => {
    expect(names({ category: 'Camping', onlyAvailable: true })).toHaveLength(8)
  })

  it('combines all criteria', () => {
    expect(names({ category: 'Tools', query: 'screw', onlyAvailable: true })).toEqual([])
    expect(names({ category: 'Tools', query: 'screw' })).toEqual(['Cordless screwdriver'])
  })
})
