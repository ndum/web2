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

describe('[%Einstieg, der Katalog mit useQuery|Getting started, the catalog with useQuery%]', () => {
  it('[%zeigt den Katalog der Kurs-API|shows the catalog of the course API%]', async () => {
    api()
    const wrapper = await visit('/')
    expect(wrapper.findAll('.catalog li')).toHaveLength(60)
  })

  it('[%fragt beim Zurückkehren nicht nochmals|does not ask again when coming back%]', async () => {
    const fetch = api()
    await visit('/')
    await router.push('/items/6')
    await flushPromises()
    await router.push('/')
    await flushPromises()
    expect(calls(fetch).filter((call) => call === `GET ${ITEMS}`)).toHaveLength(1)
  })
})
