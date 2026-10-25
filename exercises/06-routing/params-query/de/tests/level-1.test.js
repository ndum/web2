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

describe('Einstieg, eine Seite für jedes Ding', () => {
  it('zeigt unter /items/6 den Beamer', async () => {
    const wrapper = await visit('/items/6')
    expect(wrapper.find('h1').text()).toBe('Beamer')
    expect(wrapper.text().replace(/\s+/g, ' ')).toContain('CHF 80.00')
  })

  it('verlinkt jedes Ding im Katalog mit seiner Seite', async () => {
    const wrapper = await visit('/')
    const link = wrapper.findAll('.catalog a').find((entry) => entry.text() === 'Beamer')
    expect(link?.attributes('href')).toBe('/items/6')
    await link.trigger('click')
    await flushPromises()
    expect(wrapper.find('h1').text()).toBe('Beamer')
  })

  it('meldet eine Nummer, zu der es kein Ding gibt', async () => {
    expect((await visit('/items/999')).text()).toContain('Dieses Ding gibt es nicht.')
  })
})
