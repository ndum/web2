import { enableAutoUnmount, flushPromises, mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'

import App from '../src/App.vue'
import router from '../src/router/index.js'

enableAutoUnmount(afterEach)

// Goes to an address and shows App there, as if someone had typed the address into the browser
async function visit(path, options = {}) {
  await router.push(path)
  const wrapper = mount(App, { global: { plugins: [router] }, ...options })
  await flushPromises()
  return wrapper
}

afterEach(() => {
  document.body.innerHTML = ''
})

// The first test runs the first navigation of the router, the order of the tests matters here
describe('[%Knobelei, Titel und Fokus nach der Navigation|Challenge, title and focus after navigation%]', () => {
  it('[%setzt beim ersten Laden den Titel und lässt den Fokus, wo er ist|sets the title on the first load and leaves the focus where it is%]', async () => {
    // App starts the router itself, as in the browser, the address of the test page is /
    mount(App, { global: { plugins: [router] }, attachTo: document.body })
    await router.isReady()
    await flushPromises()
    expect(document.title).toBe('[%Katalog|Catalog%] · Lorraine Commons')
    expect(document.activeElement).toBe(document.body)
  })

  it('[%setzt nach jeder weiteren Navigation Titel und Fokus|sets title and focus after every further navigation%]', async () => {
    const wrapper = await visit('/', { attachTo: document.body })
    await wrapper.find('nav a[href="/team"]').trigger('click')
    // The team area loads on demand, the navigation ends a little later
    await vi.waitFor(() => expect(document.title).toBe('[%Team am Tresen|Team at the counter%] · Lorraine Commons'))
    await vi.waitFor(() => expect(document.activeElement).toBe(wrapper.find('h1').element))
  })

  it('[%setzt den Titel auch für unbekannte Adressen|sets the title for unknown addresses too%]', async () => {
    await visit('/[%gibt-es-nicht|does-not-exist%]', { attachTo: document.body })
    expect(document.title).toBe('[%Seite nicht gefunden|Page not found%] · Lorraine Commons')
  })
})
