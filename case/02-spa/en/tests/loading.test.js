// @vitest-environment happy-dom
import { afterEach, describe, expect, it, vi } from 'vitest'

import items from '../data/items.json'
import { start } from '../src/app.js'

afterEach(() => {
  vi.unstubAllGlobals()
  vi.unstubAllEnvs()
  document.body.innerHTML = ''
})

describe('Loading from the association\'s server', () => {
  it('shows a notice while loading', async () => {
    let answer
    vi.stubGlobal('fetch', vi.fn(() => new Promise((resolve) => (answer = resolve))))
    document.body.innerHTML = '<main id="app"></main>'
    const started = start(document.querySelector('#app'))
    expect(document.querySelector('#app').textContent).toContain('Loading the catalog')
    answer(new Response(JSON.stringify(items)))
    await started
    expect(document.querySelectorAll('.catalog li')).toHaveLength(60)
  })

  it('reports an error of the server clearly', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => new Response('Status 503', { status: 503 })))
    document.body.innerHTML = '<main id="app"></main>'
    await start(document.querySelector('#app'))
    expect(document.querySelector('#app').textContent).toContain('The server answers with status 503.')
  })

  it('loads the catalog from the address in VITE_CATALOG_URL', async () => {
    vi.stubEnv('VITE_CATALOG_URL', '/test/items')
    const fetch = vi.fn(async () => new Response(JSON.stringify(items)))
    vi.stubGlobal('fetch', fetch)
    document.body.innerHTML = '<main id="app"></main>'
    await start(document.querySelector('#app'))
    expect(fetch.mock.calls[0][0]).toBe('/test/items')
  })
})
