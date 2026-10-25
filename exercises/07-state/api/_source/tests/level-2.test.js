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

describe('[%Vertiefung, Anfragen an die Kurs-API|Going further, requests to the course API%]', () => {
  it('[%schickt die Anfrage als JSON an die Kurs-API|sends the request to the course API as JSON%]', async () => {
    const fetch = fakeApi({
      'GET /items': () => [200, items],
      'POST /reservations': (options) => [201, { id: 'R-1', member: 'M-117', ...JSON.parse(options.body) }],
    })
    const wrapper = await visit('/items/6')
    await fillIn(wrapper)
    expect(calls(fetch)).toContain('POST /api/[%de|en%]/reservations')
    const [, options] = fetch.mock.calls.find(([, init]) => init?.method === 'POST')
    expect(new Headers(options.headers).get('Content-Type')).toBe('application/json')
    expect(JSON.parse(options.body)).toEqual({ itemId: 6, from: '2026-11-04', to: '2026-11-07', note: '' })
    expect(wrapper.find('[role="status"]').text()).toBe('[%Anfrage R-1 ist gesendet.|Request R-1 is sent.%]')
  })

  it('[%zeigt die Meldungen der API zu den Feldern|shows the messages of the API for the fields%]', async () => {
    fakeApi({
      'GET /items': () => [200, items],
      'POST /reservations': () => [422, { error: '[%Die Anfrage enthält Fehler.|The request contains errors.%]', fields: { to: '[%Eine Ausleihe dauert höchstens sieben Tage.|A loan lasts at most seven days.%]' } }],
    })
    const wrapper = await visit('/items/6')
    await fillIn(wrapper)
    expect(wrapper.find('[role="alert"]').text()).toBe('[%Die Anfrage enthält Fehler.|The request contains errors.%]')
    expect(wrapper.find('form').text()).toContain('[%Eine Ausleihe dauert höchstens sieben Tage.|A loan lasts at most seven days.%]')
  })

  it('[%meldet, wenn das Ding schon angefragt ist|reports when the thing is already requested%]', async () => {
    fakeApi({
      'GET /items': () => [200, items],
      'POST /reservations': () => [409, { error: '[%Das Ding ist an einigen dieser Tage schon angefragt.|The thing is already requested for some of these days.%]' }],
    })
    const wrapper = await visit('/items/6')
    await fillIn(wrapper)
    expect(wrapper.find('[role="alert"]').text()).toBe('[%Das Ding ist an einigen dieser Tage schon angefragt.|The thing is already requested for some of these days.%]')
  })
})
