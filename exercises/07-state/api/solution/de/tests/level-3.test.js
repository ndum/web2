import { enableAutoUnmount, flushPromises, mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import items from '../data/items.json'
import App from '../src/App.vue'
import router from '../src/router/index.js'
import { calls, fakeApi } from './fake-api.js'

enableAutoUnmount(afterEach)

let pinia

beforeEach(() => {
  pinia = createPinia()
  setActivePinia(pinia)
})

afterEach(() => {
  vi.unstubAllGlobals()
})

async function visit(path) {
  await router.push(path)
  const wrapper = mount(App, { global: { plugins: [router, pinia] } })
  await flushPromises()
  return wrapper
}

describe('Knobelei, die eigenen Anfragen von der Kurs-API', () => {
  it('lädt die eigenen Anfragen von der Kurs-API', async () => {
    const fetch = fakeApi({
      'GET /items': () => [200, items],
      'GET /reservations': () => [200, [{ id: 'R-1', itemId: 6, member: 'M-117', from: '2026-11-04', to: '2026-11-07', note: '' }]],
    })
    const wrapper = await visit('/reservations')
    expect(calls(fetch)).toContain('GET /api/de/reservations')
    expect(wrapper.find('.catalog').text()).toContain('Beamer')
  })

  it('zeigt eine leere Liste und die Meldung der API', async () => {
    let answer = [200, []]
    fakeApi({ 'GET /items': () => [200, items], 'GET /reservations': () => answer })
    const empty = await visit('/reservations')
    expect(empty.text()).toContain('Noch keine Anfragen.')
    empty.unmount()
    answer = [401, { error: 'Melde dich zuerst an.' }]
    const signedOut = await visit('/reservations')
    expect(signedOut.find('[role="alert"]').text()).toBe('Melde dich zuerst an.')
  })

  it('bricht das Laden ab, wenn jemand die Seite verlässt', async () => {
    const fetch = fakeApi({
      'GET /items': () => [200, items],
      'GET /reservations': (options) => new Promise((resolve, reject) => options.signal.addEventListener('abort', () => reject(options.signal.reason))),
    })
    await visit('/reservations')
    await router.push('/')
    await flushPromises()
    const [, options] = fetch.mock.calls.find(([url]) => url.endsWith('/reservations'))
    expect(options.signal.aborted).toBe(true)
  })
})
