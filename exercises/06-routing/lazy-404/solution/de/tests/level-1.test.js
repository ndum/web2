import { enableAutoUnmount, flushPromises, mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'

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

describe('Einstieg, eine Seite für unbekannte Adressen', () => {
  it('zeigt für eine unbekannte Adresse die passende Seite', async () => {
    const wrapper = await visit('/vereinsabend/2026')
    expect(router.currentRoute.value.name).toBe('not-found')
    expect(router.currentRoute.value.params.pathMatch).toEqual(['vereinsabend', '2026'])
    expect(wrapper.find('h1').text()).toBe('Seite nicht gefunden')
  })

  it('führt von dort zum Katalog zurück', async () => {
    const wrapper = await visit('/gibt-es-nicht')
    await wrapper.find('main a').trigger('click')
    await flushPromises()
    expect(wrapper.find('h1').text()).toBe('Katalog')
  })

  it('zeigt sie auch für eine id aus Buchstaben', async () => {
    expect((await visit('/items/beamer')).find('h1').text()).toBe('Seite nicht gefunden')
    expect((await visit('/items/999')).text()).toContain('Dieses Ding gibt es nicht.')
  })
})
