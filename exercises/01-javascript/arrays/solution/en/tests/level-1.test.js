import { readFileSync } from 'node:fs'

import { describe, expect, it } from 'vitest'

import { availableNames } from '../src/catalog.js'

const items = JSON.parse(readFileSync(new URL('../data/items.json', import.meta.url), 'utf8'))

describe('Getting started, the tools that are in', () => {
  it('names the tools that are in, sorted by name', () => {
    expect(availableNames(items, 'Tools')).toEqual(['Circular saw', 'Drill', 'Jigsaw', 'Ladder', 'Sander', 'Spirit level', 'Staple gun', 'Toolbox'])
  })

  it('sorts by the rules of the language', () => {
    const shelf = [
      { name: 'tongs', category: 'Tools', availableFrom: null },
      { name: 'Oil can', category: 'Tools', availableFrom: null },
      { name: 'awl', category: 'Tools', availableFrom: null },
    ]
    expect(availableNames(shelf, 'Tools')).toEqual(['awl', 'Oil can', 'tongs'])
  })

  it('returns an empty list for a category without things', () => {
    expect(availableNames(items, 'Music')).toEqual([])
  })

  it('does not change the list of things', () => {
    const before = structuredClone(items)
    availableNames(items, 'Tools')
    expect(items).toEqual(before)
  })
})
