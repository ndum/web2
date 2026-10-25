import { enableAutoUnmount, flushPromises, mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import { afterEach, describe, expect, it, vi } from 'vitest'

import items from '../data/items.json'
import App from '../src/App.vue'
import router from '../src/router/index.js'

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
  return { fetch, wrapper: mount(App, { global: { plugins: [router, createPinia()] } }) }
}

describe('[%Laden von der Kurs-API|Loading from the course API%]', () => {
  it('[%zeigt während des Ladens einen Hinweis|shows a notice while loading%]', async () => {
    let answer
    const { wrapper } = await start(() => new Promise((resolve) => (answer = resolve)))
    expect(wrapper.text()).toContain('[%Der Katalog wird geladen|Loading the catalog%]')
    answer(new Response(JSON.stringify(items)))
    await flushPromises()
    expect(wrapper.findAll('.catalog li')).toHaveLength(60)
  })

  it('[%meldet einen Fehler des Servers verständlich|reports an error of the server clearly%]', async () => {
    const { wrapper } = await start(async () => new Response('Status 503', { status: 503 }))
    await flushPromises()
    expect(wrapper.text()).toContain('[%Der Server antwortet mit dem Status 503.|The server answers with status 503.%]')
  })

  it('[%lädt den Katalog über /api/de/items|loads the catalog from /api/en/items%]', async () => {
    const { fetch } = await start(async () => new Response(JSON.stringify(items)))
    await flushPromises()
    expect(fetch.mock.calls[0][0]).toBe('/api/[%de|en%]/items')
  })

  it('[%nimmt die Adresse der Kurs-API aus VITE_API_URL|takes the address of the course API from VITE_API_URL%]', async () => {
    vi.stubEnv('VITE_API_URL', 'http://localhost:3000/[%de|en%]')
    vi.resetModules()
    const { API } = await import('../src/api.js')
    expect(API).toBe('http://localhost:3000/[%de|en%]')
  })
})
