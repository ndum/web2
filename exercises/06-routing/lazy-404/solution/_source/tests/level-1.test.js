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

describe('[%Einstieg, eine Seite für unbekannte Adressen|Getting started, a page for unknown addresses%]', () => {
  it('[%zeigt für eine unbekannte Adresse die passende Seite|shows the right page for an unknown address%]', async () => {
    const wrapper = await visit('/[%vereinsabend|club-night%]/2026')
    expect(router.currentRoute.value.name).toBe('not-found')
    expect(router.currentRoute.value.params.pathMatch).toEqual(['[%vereinsabend|club-night%]', '2026'])
    expect(wrapper.find('h1').text()).toBe('[%Seite nicht gefunden|Page not found%]')
  })

  it('[%führt von dort zum Katalog zurück|leads back to the catalog from there%]', async () => {
    const wrapper = await visit('/[%gibt-es-nicht|does-not-exist%]')
    await wrapper.find('main a').trigger('click')
    await flushPromises()
    expect(wrapper.find('h1').text()).toBe('[%Katalog|Catalog%]')
  })

  it('[%zeigt sie auch für eine id aus Buchstaben|shows it for an id made of letters too%]', async () => {
    expect((await visit('/items/[%beamer|projector%]')).find('h1').text()).toBe('[%Seite nicht gefunden|Page not found%]')
    expect((await visit('/items/999')).text()).toContain('[%Dieses Ding gibt es nicht.|This thing does not exist.%]')
  })
})
