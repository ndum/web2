import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import items from '../data/items.json'
import App from '../src/App.vue'

beforeEach(() => {
  localStorage.clear()
  vi.stubGlobal('fetch', vi.fn(async () => new Response(JSON.stringify(items))))
})

afterEach(() => {
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
  location.hash = ''
})

const nextHashChange = () => new Promise((resolve) => addEventListener('hashchange', resolve, { once: true }))

async function start() {
  const wrapper = mount(App)
  await flushPromises()
  return wrapper
}

describe('Eine Seite für jedes Ding', () => {
  it('öffnet die Seite eines Dings direkt über ihre Adresse', async () => {
    location.hash = '#/items/2'
    const wrapper = await start()
    expect(wrapper.find('h1').text()).toBe('Zelt für vier Personen')
    expect(wrapper.find('.state').text()).toBe('Wieder verfügbar ab 12.11.2026')
    expect(wrapper.text().replace(/\s+/g, ' ')).toContain('CHF 50.00')
  })

  it('führt mit dem Link zurück zum Katalog', async () => {
    location.hash = '#/items/6'
    const wrapper = await start()
    const changed = nextHashChange()
    wrapper.find('main a[href="#/"]').element.click()
    await changed
    await flushPromises()
    expect(wrapper.find('h1').text()).toBe('Katalog')
  })

  it('meldet unbekannte Adressen und Dinge', async () => {
    location.hash = '#/items/999'
    const wrapper = await start()
    expect(wrapper.text()).toContain('Dieses Ding gibt es nicht.')
    const changed = nextHashChange()
    location.hash = '#/members'
    await changed
    await flushPromises()
    expect(wrapper.text()).toContain('Diese Seite gibt es nicht.')
  })

  it('meldet den Listener für hashchange beim Abbauen wieder ab', async () => {
    const add = vi.spyOn(window, 'addEventListener')
    const remove = vi.spyOn(window, 'removeEventListener')
    const wrapper = await start()
    const call = add.mock.calls.find(([type]) => type === 'hashchange')
    expect(call).toBeDefined()
    wrapper.unmount()
    expect(remove).toHaveBeenCalledWith('hashchange', call[1])
  })
})
