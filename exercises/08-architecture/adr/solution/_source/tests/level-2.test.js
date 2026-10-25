import { describe, expect, it } from 'vitest'

import { indexRow, readAdr } from './helpers.js'

describe('[%Vertiefung, ein Entscheid ersetzt einen anderen|Going further, a decision supersedes another%]', () => {
  it('[%legt ADR 3 mit allen Abschnitten an|creates ADR 3 with all sections%]', () => {
    expect(Object.keys(readAdr(3).sections)).toEqual(['Status', '[%Kontext|Context%]', '[%Entscheid|Decision%]', '[%Konsequenzen|Consequences%]'])
  })

  it('[%verweist in ADR 3 auf den ersetzten Entscheid|points to the superseded decision in ADR 3%]', () => {
    expect(readAdr(3).sections.Status).toMatch(/[%ersetzt|supersedes%] \[ADR 2\]\(0002-[^)]+\.md\)/i)
  })

  it('[%lässt ADR 2 stehen und setzt seinen Status auf ersetzt|keeps ADR 2 and sets its status to superseded%]', () => {
    const adr = readAdr(2)
    expect(adr.sections.Status).toMatch(/^[%Ersetzt durch|Superseded by%] \[ADR 3\]\(0003-[^)]+\.md\)/)
    expect(adr.sections['[%Entscheid|Decision%]'].length).toBeGreaterThan(60)
  })

  it('[%zeigt den neuen Status im Verzeichnis|shows the new status in the index%]', () => {
    expect(indexRow(readAdr(2).name)).toContain('[%Ersetzt durch ADR 3|Superseded by ADR 3%]')
    expect(indexRow(readAdr(3).name)).toMatch(/\|\s*3\s*\|/)
  })
})
