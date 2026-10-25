import { readFileSync } from 'node:fs'

import { describe, expect, it } from 'vitest'

// The file does not exist before the exercise, so the test loads it only when it is there
const modules = import.meta.glob('../src/format.js')

async function loadFormat() {
  const load = modules['../src/format.js']
  expect(load, 'Lege die Datei src/format.js an').toBeDefined()
  return load()
}

const overview = () => readFileSync(new URL('../src/overview.js', import.meta.url), 'utf8')

describe('Einstieg, ein Modul für Beträge', () => {
  it('exportiert die Funktion formatDeposit', async () => {
    const format = await loadFormat()
    expect(format.formatDeposit).toBeTypeOf('function')
  })

  it('formatiert Beträge in Franken', async () => {
    const { formatDeposit } = await loadFormat()
    // Intl puts a non-breaking space after CHF, a normal space counts as well
    const shown = (amount) => formatDeposit(amount).replace(/\s/g, ' ')
    expect(shown(20)).toBe('CHF 20.00')
    expect(shown(12.5)).toBe('CHF 12.50')
  })

  it('importiert formatDeposit in der Übersicht, statt die Funktion selbst zu definieren', () => {
    expect(overview()).not.toMatch(/function formatDeposit/)
    expect(overview()).toMatch(/import\s*\{[^}]*\bformatDeposit\b[^}]*\}\s*from/)
  })
})
