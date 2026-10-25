import { enableAutoUnmount, flushPromises, mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'

import items from '../data/items.json'
import App from '../src/App.vue'
import router from '../src/router/index.js'

enableAutoUnmount(afterEach)

afterEach(() => {
  vi.unstubAllGlobals()
  vi.unstubAllEnvs()
})

// Shows App on the catalog, the test decides how the server answers
async function start() {
  await router.push('/')
  return mount(App, { global: { plugins: [router] } })
}

describe('Laden vom Server des Vereins', () => {
  it('zeigt während des Ladens einen Hinweis', async () => {
    let answer
    vi.stubGlobal('fetch', vi.fn(() => new Promise((resolve) => (answer = resolve))))
    const wrapper = await start()
    expect(wrapper.text()).toContain('Der Katalog wird geladen')
    answer(new Response(JSON.stringify(items)))
    await flushPromises()
    expect(wrapper.findAll('.catalog li')).toHaveLength(60)
  })

  it('meldet einen Fehler des Servers verständlich', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => new Response('Status 503', { status: 503 })))
    const wrapper = await start()
    await flushPromises()
    expect(wrapper.text()).toContain('Der Server antwortet mit dem Status 503.')
  })

  it('lädt den Katalog über /api/items', async () => {
    const fetch = vi.fn(async () => new Response(JSON.stringify(items)))
    vi.stubGlobal('fetch', fetch)
    await start()
    await flushPromises()
    expect(fetch.mock.calls[0][0]).toBe('/api/items')
  })

  it('lädt den Katalog von der Adresse in VITE_CATALOG_URL', async () => {
    vi.stubEnv('VITE_CATALOG_URL', '/test/items')
    const fetch = vi.fn(async () => new Response(JSON.stringify(items)))
    vi.stubGlobal('fetch', fetch)
    await start()
    await flushPromises()
    expect(fetch.mock.calls[0][0]).toBe('/test/items')
  })
})
