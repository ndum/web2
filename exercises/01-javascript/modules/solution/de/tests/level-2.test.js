import { spawnSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

import { describe, expect, it } from 'vitest'

const modules = import.meta.glob('../src/catalog.js')

async function loadCatalog() {
  const load = modules['../src/catalog.js']
  expect(load, 'Lege die Datei src/catalog.js an').toBeDefined()
  return load()
}

const project = fileURLToPath(new URL('..', import.meta.url))
const overview = () => readFileSync(new URL('../src/overview.js', import.meta.url), 'utf8')

const items = [
  { id: 1, name: 'Bohrmaschine', availableFrom: null },
  { id: 2, name: 'Zelt für vier Personen', availableFrom: '2026-11-12' },
]

describe('Vertiefung, ein Modul für den Katalog', () => {
  it('zählt die Dinge, die da sind', async () => {
    const { countAvailable } = await loadCatalog()
    expect(countAvailable(items)).toBe(1)
  })

  it('findet ein Ding über seine Nummer', async () => {
    const { findById } = await loadCatalog()
    expect(findById(items, 2)).toBe(items[1])
    expect(findById(items, 99)).toBeUndefined()
  })

  it('importiert beide Funktionen in der Übersicht', () => {
    expect(overview()).not.toMatch(/function (countAvailable|findById)/)
    expect(overview()).toMatch(/import\s*\{[^}]*\bcountAvailable\b[^}]*\}\s*from/)
    expect(overview()).toMatch(/import\s*\{[^}]*\bfindById\b[^}]*\}\s*from/)
  })

  it('hat ein npm-Skript overview', () => {
    const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'))
    expect(pkg.scripts?.overview).toBe('node src/overview.js')
  })

  it('gibt die Übersicht weiterhin aus', () => {
    const result = spawnSync(process.execPath, ['src/overview.js'], { cwd: project, encoding: 'utf8' })
    expect(result.stderr).toBe('')
    expect(result.stdout).toContain('49 von 60 Dingen sind da.')
  })
})
