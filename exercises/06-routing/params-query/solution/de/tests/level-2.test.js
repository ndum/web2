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

const names = (wrapper) => wrapper.findAll('.catalog .name').map((name) => name.text())

describe('Vertiefung, die Suche in der Adresse', () => {
  it('filtert nach q aus der Adresse', async () => {
    const wrapper = await visit('/?q=zelt')
    expect(wrapper.find('#search').element.value).toBe('zelt')
    expect(names(wrapper)).toHaveLength(3)
  })

  it('schreibt den Suchtext als q in die Adresse', async () => {
    const wrapper = await visit('/')
    await wrapper.find('#search').setValue('säge')
    await flushPromises()
    expect(router.currentRoute.value.query.q).toBe('säge')
    expect(names(wrapper)).toHaveLength(2)
  })

  it('nimmt q bei einem leeren Feld aus der Adresse', async () => {
    const wrapper = await visit('/?q=zelt')
    await wrapper.find('#search').setValue('')
    await flushPromises()
    expect(router.currentRoute.value.fullPath).toBe('/')
    expect(names(wrapper)).toHaveLength(60)
  })
})
