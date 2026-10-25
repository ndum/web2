import { describe, expect, it } from 'vitest'

import { indexRow, readAdr } from './helpers.js'

const SECTIONS = ['Status', 'Kontext', 'Entscheid', 'Konsequenzen']

describe('Einstieg, ein erster Entscheid', () => {
  it('legt ADR 2 an', () => {
    expect(readAdr(2)).not.toBeNull()
  })

  it('nummeriert den Titel', () => {
    expect(readAdr(2).title).toMatch(/^2\. \S/)
  })

  it('hat die vier Abschnitte in dieser Reihenfolge', () => {
    expect(Object.keys(readAdr(2).sections)).toEqual(SECTIONS)
  })

  it('füllt Kontext, Entscheid und Konsequenzen mit ganzen Sätzen', () => {
    const { sections } = readAdr(2)
    for (const name of SECTIONS.slice(1)) {
      expect(sections[name].length).toBeGreaterThan(60)
      expect(sections[name]).toMatch(/\.$/)
    }
  })

  it('führt ADR 2 im Verzeichnis', () => {
    expect(indexRow(readAdr(2).name)).toMatch(/\|\s*2\s*\|/)
  })
})
