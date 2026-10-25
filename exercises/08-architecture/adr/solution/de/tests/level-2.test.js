import { describe, expect, it } from 'vitest'

import { indexRow, readAdr } from './helpers.js'

describe('Vertiefung, ein Entscheid ersetzt einen anderen', () => {
  it('legt ADR 3 mit allen Abschnitten an', () => {
    expect(Object.keys(readAdr(3).sections)).toEqual(['Status', 'Kontext', 'Entscheid', 'Konsequenzen'])
  })

  it('verweist in ADR 3 auf den ersetzten Entscheid', () => {
    expect(readAdr(3).sections.Status).toMatch(/ersetzt \[ADR 2\]\(0002-[^)]+\.md\)/i)
  })

  it('lässt ADR 2 stehen und setzt seinen Status auf ersetzt', () => {
    const adr = readAdr(2)
    expect(adr.sections.Status).toMatch(/^Ersetzt durch \[ADR 3\]\(0003-[^)]+\.md\)/)
    expect(adr.sections['Entscheid'].length).toBeGreaterThan(60)
  })

  it('zeigt den neuen Status im Verzeichnis', () => {
    expect(indexRow(readAdr(2).name)).toContain('Ersetzt durch ADR 3')
    expect(indexRow(readAdr(3).name)).toMatch(/\|\s*3\s*\|/)
  })
})
