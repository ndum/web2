import { flushPromises, mount } from '@vue/test-utils'
import { vi } from 'vitest'

import items from '../data/items.json'
import App from '../src/App.vue'
import router from '../src/router/index.js'

// Goes to an address and shows App there, as after typing the address into the browser.
// A stand-in for the association's server answers with the catalog.
export async function visit(path, options = {}) {
  vi.stubGlobal('fetch', vi.fn(async () => new Response(JSON.stringify(items))))
  await router.push(path)
  const wrapper = mount(App, { global: { plugins: [router] }, ...options })
  await flushPromises()
  return wrapper
}

// The names of the things that the page shows as cards
export const cardNames = (wrapper) => wrapper.findAll('.card h2').map((heading) => heading.text())

export const cardOf = (wrapper, name) => wrapper.findAll('.card').find((card) => card.find('h2').text() === name)
