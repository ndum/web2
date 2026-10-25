import { enableAutoUnmount, flushPromises, mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import items from '../data/items.json'
import App from '../src/App.vue'
import router from '../src/router/index.js'
import { useAuthStore } from '../src/stores/auth.js'
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

async function fillIn(wrapper) {
  useAuthStore().member = { number: 'M-117', name: 'Martina Hostettler', team: true }
  await flushPromises()
  await wrapper.find('#from').setValue('2026-11-04')
  await wrapper.find('#to').setValue('2026-11-07')
  await wrapper.find('form').trigger('submit')
  await flushPromises()
}

describe('Going further, requests to the course API', () => {
  it('sends the request to the course API as JSON', async () => {
    const fetch = fakeApi({
      'GET /items': () => [200, items],
      'POST /reservations': (options) => [201, { id: 'R-1', member: 'M-117', ...JSON.parse(options.body) }],
    })
    const wrapper = await visit('/items/6')
    await fillIn(wrapper)
    expect(calls(fetch)).toContain('POST /api/en/reservations')
    const [, options] = fetch.mock.calls.find(([, init]) => init?.method === 'POST')
    expect(new Headers(options.headers).get('Content-Type')).toBe('application/json')
    expect(JSON.parse(options.body)).toEqual({ itemId: 6, from: '2026-11-04', to: '2026-11-07', note: '' })
    expect(wrapper.find('[role="status"]').text()).toBe('Request R-1 is sent.')
  })

  it('shows the messages of the API for the fields', async () => {
    fakeApi({
      'GET /items': () => [200, items],
      'POST /reservations': () => [422, { error: 'The request contains errors.', fields: { to: 'A loan lasts at most seven days.' } }],
    })
    const wrapper = await visit('/items/6')
    await fillIn(wrapper)
    expect(wrapper.find('[role="alert"]').text()).toBe('The request contains errors.')
    expect(wrapper.find('form').text()).toContain('A loan lasts at most seven days.')
  })

  it('reports when the thing is already requested', async () => {
    fakeApi({
      'GET /items': () => [200, items],
      'POST /reservations': () => [409, { error: 'The thing is already requested for some of these days.' }],
    })
    const wrapper = await visit('/items/6')
    await fillIn(wrapper)
    expect(wrapper.find('[role="alert"]').text()).toBe('The thing is already requested for some of these days.')
  })
})
