import { readFileSync } from 'node:fs'

import { describe, expect, it } from 'vitest'

import { availableNames, countByCategory, overviewLines } from '../src/index.js'

const items = JSON.parse(readFileSync(new URL('../data/items.json', import.meta.url), 'utf8'))

describe('Overview for the counter', () => {
  it('says how many things are in', () => {
    expect(overviewLines(items)[0]).toBe('49 of 60 things are in.')
  })

  it('states the deposits of the things on loan in francs', () => {
    // Intl puts a non-breaking space after CHF
    expect(overviewLines(items)[1].replace(/\s/g, ' ')).toBe('For the 11 things on loan, the cash box holds CHF 520.00 in deposits.')
  })

  it('counts the things per category', () => {
    expect(countByCategory(items)).toEqual({
      Tools: 10,
      Garden: 10,
      Kitchen: 10,
      Camping: 10,
      Kids: 10,
      Parties: 10,
    })
  })

  it('names the tools that are in, sorted by name', () => {
    expect(availableNames(items, 'Tools')).toEqual(['Circular saw', 'Drill', 'Jigsaw', 'Ladder', 'Sander', 'Spirit level', 'Staple gun', 'Toolbox'])
  })
})
