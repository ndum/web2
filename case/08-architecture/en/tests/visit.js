import { flushPromises, mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { createApp } from 'vue'

import App from '../src/App.vue'
import { apiKey } from '../src/api/index.js'
import { createHttpApi } from '../src/api/http.js'
import router from '../src/router/index.js'
import { fakeApi } from './fake-api.js'

// The stand-in for the course API of the last visit, for tests that look at what it received
export let api = null

// Pinia with the API, as main.js sets it up. A small app gives Pinia the API before the first
// navigation, because a guard may create a store before App is mounted.
export function createTestPinia(adapter = createHttpApi('/api/en')) {
  const pinia = createPinia()
  createApp({}).provide(apiKey, adapter).use(pinia)
  setActivePinia(pinia)
  return { pinia, adapter }
}

// Mounts App with the router, Pinia and the same API
export function mountApp({ pinia, adapter }, options = {}) {
  return mount(App, { global: { plugins: [router, pinia], provide: { [apiKey]: adapter } }, ...options })
}

// Goes to an address and shows App there, as after typing the address into the browser, with a
// fresh Pinia and a stand-in for the course API. member signs someone in beforehand, as the
// session cookie of an earlier visit would.
export async function visit(path, { member = null, requests = [], ...options } = {}) {
  api = fakeApi({ member, requests })
  const setup = createTestPinia()
  await router.push(path)
  const wrapper = mountApp(setup, options)
  await flushPromises()
  return wrapper
}

// The names of the things that the page shows as cards
export const cardNames = (wrapper) => wrapper.findAll('.card h2').map((heading) => heading.text())

export const cardOf = (wrapper, name) => wrapper.findAll('.card').find((card) => card.find('h2').text() === name)

// The text a sighted person reads, without the hidden names for screen readers
export function visibleText(wrapper) {
  const copy = wrapper.element.cloneNode(true)
  copy.querySelectorAll('.visually-hidden').forEach((hidden) => hidden.remove())
  return copy.textContent.replace(/\s+/g, ' ').trim()
}
