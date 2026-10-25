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

describe('Loading from the course API', () => {
  it('shows a notice while loading', async () => {
    let answer
    const { wrapper } = await start(() => new Promise((resolve) => (answer = resolve)))
    expect(wrapper.text()).toContain('Loading the catalog')
    answer(new Response(JSON.stringify(items)))
    await flushPromises()
    expect(wrapper.findAll('.catalog li')).toHaveLength(60)
  })

  it('reports an error of the server clearly', async () => {
    const { wrapper } = await start(async () => new Response('Status 503', { status: 503 }))
    await flushPromises()
    expect(wrapper.text()).toContain('The server answers with status 503.')
  })

  it('loads the catalog from /api/en/items', async () => {
    const { fetch } = await start(async () => new Response(JSON.stringify(items)))
    await flushPromises()
    expect(fetch.mock.calls[0][0]).toBe('/api/en/items')
  })

  it('takes the address of the course API from VITE_API_URL', async () => {
    vi.stubEnv('VITE_API_URL', 'http://localhost:3000/en')
    vi.resetModules()
    const { API } = await import('../src/api.js')
    expect(API).toBe('http://localhost:3000/en')
  })
})
