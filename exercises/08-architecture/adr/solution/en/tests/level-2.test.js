import { describe, expect, it } from 'vitest'

import { indexRow, readAdr } from './helpers.js'

describe('Going further, a decision supersedes another', () => {
  it('creates ADR 3 with all sections', () => {
    expect(Object.keys(readAdr(3).sections)).toEqual(['Status', 'Context', 'Decision', 'Consequences'])
  })

  it('points to the superseded decision in ADR 3', () => {
    expect(readAdr(3).sections.Status).toMatch(/supersedes \[ADR 2\]\(0002-[^)]+\.md\)/i)
  })

  it('keeps ADR 2 and sets its status to superseded', () => {
    const adr = readAdr(2)
    expect(adr.sections.Status).toMatch(/^Superseded by \[ADR 3\]\(0003-[^)]+\.md\)/)
    expect(adr.sections['Decision'].length).toBeGreaterThan(60)
  })

  it('shows the new status in the index', () => {
    expect(indexRow(readAdr(2).name)).toContain('Superseded by ADR 3')
    expect(indexRow(readAdr(3).name)).toMatch(/\|\s*3\s*\|/)
  })
})
