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

describe('Loading from the association\'s server', () => {
  it('shows a notice while loading', async () => {
    let answer
    vi.stubGlobal('fetch', vi.fn(() => new Promise((resolve) => (answer = resolve))))
    const wrapper = await start()
    expect(wrapper.text()).toContain('Loading the catalog')
    answer(new Response(JSON.stringify(items)))
    await flushPromises()
    expect(wrapper.findAll('.catalog li')).toHaveLength(60)
  })

  it('reports an error of the server clearly', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => new Response('Status 503', { status: 503 })))
    const wrapper = await start()
    await flushPromises()
    expect(wrapper.text()).toContain('The server answers with status 503.')
  })

  it('loads the catalog from /api/items', async () => {
    const fetch = vi.fn(async () => new Response(JSON.stringify(items)))
    vi.stubGlobal('fetch', fetch)
    await start()
    await flushPromises()
    expect(fetch.mock.calls[0][0]).toBe('/api/items')
  })

  it('loads the catalog from the address in VITE_CATALOG_URL', async () => {
    vi.stubEnv('VITE_CATALOG_URL', '/test/items')
    const fetch = vi.fn(async () => new Response(JSON.stringify(items)))
    vi.stubGlobal('fetch', fetch)
    await start()
    await flushPromises()
    expect(fetch.mock.calls[0][0]).toBe('/test/items')
  })
})
