import { describe, expect, it } from 'vitest'

import { indexRow, readAdr } from './helpers.js'

describe('Challenge, a proposal with options', () => {
  it('creates ADR 4 as a proposal', () => {
    expect(readAdr(4).sections.Status).toMatch(/^Proposed/)
  })

  it('puts the options between context and decision', () => {
    expect(Object.keys(readAdr(4).sections)).toEqual([
      'Status',
      'Context',
      'Options',
      'Decision',
      'Consequences',
    ])
  })

  it('names at least two options as a list', () => {
    const options = readAdr(4).sections['Options'].match(/^- \S.*$/gm) ?? []
    expect(options.length).toBeGreaterThanOrEqual(2)
  })

  it('lists ADR 4 in the index as a proposal', () => {
    expect(indexRow(readAdr(4).name)).toContain('Proposed')
  })
})
