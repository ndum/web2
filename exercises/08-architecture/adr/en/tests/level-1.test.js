import { describe, expect, it } from 'vitest'

import { indexRow, readAdr } from './helpers.js'

const SECTIONS = ['Status', 'Context', 'Decision', 'Consequences']

describe('Getting started, a first decision', () => {
  it('creates ADR 2', () => {
    expect(readAdr(2)).not.toBeNull()
  })

  it('numbers the title', () => {
    expect(readAdr(2).title).toMatch(/^2\. \S/)
  })

  it('has the four sections in this order', () => {
    expect(Object.keys(readAdr(2).sections)).toEqual(SECTIONS)
  })

  it('fills context, decision and consequences with full sentences', () => {
    const { sections } = readAdr(2)
    for (const name of SECTIONS.slice(1)) {
      expect(sections[name].length).toBeGreaterThan(60)
      expect(sections[name]).toMatch(/\.$/)
    }
  })

  it('lists ADR 2 in the index', () => {
    expect(indexRow(readAdr(2).name)).toMatch(/\|\s*2\s*\|/)
  })
})
