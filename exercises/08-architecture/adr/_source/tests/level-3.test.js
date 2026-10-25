import { describe, expect, it } from 'vitest'

import { indexRow, readAdr } from './helpers.js'

describe('[%Knobelei, ein Vorschlag mit Optionen|Challenge, a proposal with options%]', () => {
  it('[%legt ADR 4 als Vorschlag an|creates ADR 4 as a proposal%]', () => {
    expect(readAdr(4).sections.Status).toMatch(/^[%Vorgeschlagen|Proposed%]/)
  })

  it('[%stellt die Optionen zwischen Kontext und Entscheid|puts the options between context and decision%]', () => {
    expect(Object.keys(readAdr(4).sections)).toEqual([
      'Status',
      '[%Kontext|Context%]',
      '[%Optionen|Options%]',
      '[%Entscheid|Decision%]',
      '[%Konsequenzen|Consequences%]',
    ])
  })

  it('[%nennt mindestens zwei Optionen als Liste|names at least two options as a list%]', () => {
    const options = readAdr(4).sections['[%Optionen|Options%]'].match(/^- \S.*$/gm) ?? []
    expect(options.length).toBeGreaterThanOrEqual(2)
  })

  it('[%führt ADR 4 im Verzeichnis als Vorschlag|lists ADR 4 in the index as a proposal%]', () => {
    expect(indexRow(readAdr(4).name)).toContain('[%Vorgeschlagen|Proposed%]')
  })
})
