import { PiniaColada } from '@pinia/colada'
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
  const wrapper = mount(App, { global: { plugins: [router, pinia, PiniaColada] } })
  await flushPromises()
  return wrapper
}

const ITEMS = '/api/de/items'

function api(requests = []) {
  return fakeApi({
    'GET /items': () => [200, items],
    'GET /items/6': () => [200, items[5]],
    'GET /items/2': () => [200, items[1]],
    'GET /reservations': () => [200, requests],
    'POST /reservations': (options) => {
      const request = { id: `R-${requests.length + 1}`, member: 'M-117', ...JSON.parse(options.body) }
      requests.push(request)
      return [201, request]
    },
  })
}

describe('Knobelei, eine Anfrage mit useMutation', () => {
  it('lädt nach dem Senden die eigenen Anfragen neu', async () => {
    const fetch = api()
    const wrapper = await visit('/items/6')
    expect(wrapper.text()).toContain('Noch keine Anfragen.')
    await wrapper.find('#from').setValue('2026-11-04')
    await wrapper.find('#to').setValue('2026-11-07')
    await wrapper.find('form').trigger('submit')
    await flushPromises()
    await flushPromises()
    expect(calls(fetch).filter((call) => call === 'GET /api/de/reservations')).toHaveLength(2)
    expect(wrapper.find('.requests').text()).toContain('R-1')
  })
})
