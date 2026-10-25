import { enableAutoUnmount, flushPromises } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'

import items from '../data/items.json'
import router from '../src/router/index.js'
import { createTestPinia, mountApp } from './visit.js'

enableAutoUnmount(afterEach)

afterEach(() => {
  vi.unstubAllGlobals()
  vi.unstubAllEnvs()
})

// Shows App on the catalog, the test decides how the course API answers for the catalog
async function start(answerForItems) {
  const fetch = vi.fn(async (url) =>
    url.endsWith('/session') ? new Response(JSON.stringify({ error: 'no session' }), { status: 401 }) : answerForItems(),
  )
  vi.stubGlobal('fetch', fetch)
  await router.push('/')
  return { fetch, wrapper: mountApp(createTestPinia()) }
}

describe('Laden von der Kurs-API', () => {
  it('zeigt während des Ladens einen Hinweis', async () => {
    let answer
    const { wrapper } = await start(() => new Promise((resolve) => (answer = resolve)))
    expect(wrapper.text()).toContain('Der Katalog wird geladen')
    answer(new Response(JSON.stringify(items)))
    await flushPromises()
    expect(wrapper.findAll('.catalog li')).toHaveLength(60)
  })

  it('meldet einen Fehler des Servers verständlich', async () => {
    const { wrapper } = await start(async () => new Response('Status 503', { status: 503 }))
    await flushPromises()
    expect(wrapper.text()).toContain('Der Server antwortet mit dem Status 503.')
  })

  it('lädt den Katalog über /api/de/items', async () => {
    const { fetch } = await start(async () => new Response(JSON.stringify(items)))
    await flushPromises()
    expect(fetch.mock.calls[0][0]).toBe('/api/de/items')
  })

  it('nimmt die Adresse der Kurs-API aus VITE_API_URL', async () => {
    vi.stubEnv('VITE_API_URL', 'http://localhost:3000/de')
    vi.resetModules()
    const { API_URL } = await import('../src/api/index.js')
    expect(API_URL).toBe('http://localhost:3000/de')
  })
})
