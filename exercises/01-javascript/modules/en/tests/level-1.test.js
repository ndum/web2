import { readFileSync } from 'node:fs'

import { describe, expect, it } from 'vitest'

// The file does not exist before the exercise, so the test loads it only when it is there
const modules = import.meta.glob('../src/format.js')

async function loadFormat() {
  const load = modules['../src/format.js']
  expect(load, 'Create the file src/format.js').toBeDefined()
  return load()
}

const overview = () => readFileSync(new URL('../src/overview.js', import.meta.url), 'utf8')

describe('Getting started, a module for amounts', () => {
  it('exports the function formatDeposit', async () => {
    const format = await loadFormat()
    expect(format.formatDeposit).toBeTypeOf('function')
  })

  it('formats amounts in francs', async () => {
    const { formatDeposit } = await loadFormat()
    // Intl puts a non-breaking space after CHF, a normal space counts as well
    const shown = (amount) => formatDeposit(amount).replace(/\s/g, ' ')
    expect(shown(20)).toBe('CHF 20.00')
    expect(shown(12.5)).toBe('CHF 12.50')
  })

  it('imports formatDeposit in the overview instead of defining the function there', () => {
    expect(overview()).not.toMatch(/function formatDeposit/)
    expect(overview()).toMatch(/import\s*\{[^}]*\bformatDeposit\b[^}]*\}\s*from/)
  })
})
