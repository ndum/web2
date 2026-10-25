import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import items from '../data/items.json'
import App from '../src/App.vue'

beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn(async () => new Response(JSON.stringify(items))))
})

afterEach(() => {
  vi.unstubAllGlobals()
  location.hash = ''
})

const nextHashChange = () => new Promise((resolve) => addEventListener('hashchange', resolve, { once: true }))

async function start() {
  const wrapper = mount(App)
  await flushPromises()
  return wrapper
}

describe('A page for every thing', () => {
  it('opens the page of a thing directly from its address', async () => {
    location.hash = '#/items/2'
    const wrapper = await start()
    expect(wrapper.find('h1').text()).toBe('Tent for four')
    expect(wrapper.find('.state').text()).toBe('Available again from 11/12/2026')
    expect(wrapper.text().replace(/\s+/g, ' ')).toContain('CHF 50.00')
  })

  it('leads back to the catalog with the link', async () => {
    location.hash = '#/items/6'
    const wrapper = await start()
    const changed = nextHashChange()
    wrapper.find('main a[href="#/"]').element.click()
    await changed
    await flushPromises()
    expect(wrapper.find('h1').text()).toBe('Catalog')
  })

  it('reports unknown addresses and things', async () => {
    location.hash = '#/items/999'
    const wrapper = await start()
    expect(wrapper.text()).toContain('This thing does not exist.')
    const changed = nextHashChange()
    location.hash = '#/members'
    await changed
    await flushPromises()
    expect(wrapper.text()).toContain('This page does not exist.')
  })
})
