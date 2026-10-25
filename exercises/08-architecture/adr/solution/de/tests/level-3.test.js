import { describe, expect, it } from 'vitest'

import { indexRow, readAdr } from './helpers.js'

describe('Knobelei, ein Vorschlag mit Optionen', () => {
  it('legt ADR 4 als Vorschlag an', () => {
    expect(readAdr(4).sections.Status).toMatch(/^Vorgeschlagen/)
  })

  it('stellt die Optionen zwischen Kontext und Entscheid', () => {
    expect(Object.keys(readAdr(4).sections)).toEqual([
      'Status',
      'Kontext',
      'Optionen',
      'Entscheid',
      'Konsequenzen',
    ])
  })

  it('nennt mindestens zwei Optionen als Liste', () => {
    const options = readAdr(4).sections['Optionen'].match(/^- \S.*$/gm) ?? []
    expect(options.length).toBeGreaterThanOrEqual(2)
  })

  it('führt ADR 4 im Verzeichnis als Vorschlag', () => {
    expect(indexRow(readAdr(4).name)).toContain('Vorgeschlagen')
  })
})
