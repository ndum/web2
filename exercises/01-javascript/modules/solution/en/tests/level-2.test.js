import { spawnSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

import { describe, expect, it } from 'vitest'

const modules = import.meta.glob('../src/catalog.js')

async function loadCatalog() {
  const load = modules['../src/catalog.js']
  expect(load, 'Create the file src/catalog.js').toBeDefined()
  return load()
}

const project = fileURLToPath(new URL('..', import.meta.url))
const overview = () => readFileSync(new URL('../src/overview.js', import.meta.url), 'utf8')

const items = [
  { id: 1, name: 'Drill', availableFrom: null },
  { id: 2, name: 'Tent for four', availableFrom: '2026-11-12' },
]

describe('Going further, a module for the catalog', () => {
  it('counts the things that are in', async () => {
    const { countAvailable } = await loadCatalog()
    expect(countAvailable(items)).toBe(1)
  })

  it('finds a thing by its id', async () => {
    const { findById } = await loadCatalog()
    expect(findById(items, 2)).toBe(items[1])
    expect(findById(items, 99)).toBeUndefined()
  })

  it('imports both functions in the overview', () => {
    expect(overview()).not.toMatch(/function (countAvailable|findById)/)
    expect(overview()).toMatch(/import\s*\{[^}]*\bcountAvailable\b[^}]*\}\s*from/)
    expect(overview()).toMatch(/import\s*\{[^}]*\bfindById\b[^}]*\}\s*from/)
  })

  it('has an npm script overview', () => {
    const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'))
    expect(pkg.scripts?.overview).toBe('node src/overview.js')
  })

  it('still prints the overview', () => {
    const result = spawnSync(process.execPath, ['src/overview.js'], { cwd: project, encoding: 'utf8' })
    expect(result.stderr).toBe('')
    expect(result.stdout).toContain('49 of 60 things are in.')
  })
})
