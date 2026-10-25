import { flushPromises, mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'

import App from '../src/App.vue'
import router from '../src/router/index.js'
import { fakeApi } from './fake-api.js'

// The stand-in for the course API of the last visit, for tests that look at what it received
export let api = null

// Goes to an address and shows App there, as after typing the address into the browser, with a
// fresh Pinia and a stand-in for the course API. member signs someone in beforehand, as the
// session cookie of an earlier visit would.
export async function visit(path, { member = null, requests = [], ...options } = {}) {
  api = fakeApi({ member, requests })
  const pinia = createPinia()
  setActivePinia(pinia)
  await router.push(path)
  const wrapper = mount(App, { global: { plugins: [router, pinia] }, ...options })
  await flushPromises()
  return wrapper
}

// The names of the things that the page shows as cards
export const cardNames = (wrapper) => wrapper.findAll('.card h2').map((heading) => heading.text())

export const cardOf = (wrapper, name) => wrapper.findAll('.card').find((card) => card.find('h2').text() === name)
