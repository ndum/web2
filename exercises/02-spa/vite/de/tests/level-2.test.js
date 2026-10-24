// @vitest-environment happy-dom
import { readFileSync } from 'node:fs'

import { afterEach, describe, expect, it, vi } from 'vitest'

import items from '../data/items.json'
import { start } from '../src/app.js'

afterEach(() => {
  vi.unstubAllGlobals()
  vi.unstubAllEnvs()
  document.body.innerHTML = ''
})

describe('Vertiefung, die Adresse aus einer Umgebungsvariable', () => {
  it('lädt den Katalog von der Adresse in VITE_CATALOG_URL', async () => {
    vi.stubEnv('VITE_CATALOG_URL', '/test/items')
    const fetch = vi.fn(async () => new Response(JSON.stringify(items)))
    vi.stubGlobal('fetch', fetch)
    document.body.innerHTML = '<main id="app"></main>'
    await start(document.querySelector('#app'))
    expect(fetch.mock.calls[0][0]).toBe('/test/items')
  })

  it('beschreibt die Variable in der Datei .env.example', () => {
    // Vitest runs in the folder of the project
    const example = readFileSync('.env.example', 'utf8')
    expect(example).toMatch(/^VITE_CATALOG_URL=\/items$/m)
  })
})
