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

const ITEMS = '/api/[%de|en%]/items'

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

describe('[%Vertiefung, ein Schlüssel pro Ding|Going further, a key per thing%]', () => {
  it('[%zeigt das Ding der Adresse|shows the thing of the address%]', async () => {
    api()
    const wrapper = await visit('/items/6')
    expect(wrapper.find('h1').text()).toBe('[%Beamer|Projector%]')
  })

  it('[%holt ein Ding, das schon da war, aus dem Cache|takes a thing seen before from the cache%]', async () => {
    const fetch = api()
    const wrapper = await visit('/items/6')
    await router.push('/items/2')
    await flushPromises()
    expect(wrapper.find('h1').text()).toBe('[%Zelt für vier Personen|Tent for four%]')
    await router.push('/items/6')
    await flushPromises()
    expect(wrapper.find('h1').text()).toBe('[%Beamer|Projector%]')
    expect(calls(fetch).filter((call) => call === `GET ${ITEMS}/6`)).toHaveLength(1)
  })
})
