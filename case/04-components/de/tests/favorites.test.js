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

describe('Favoriten', () => {
  it('markiert Dinge als Favoriten und zählt sie im Kopf', async () => {
    const wrapper = mount(App)
    await flushPromises()
    const buttons = wrapper.findAll('button.favorite')
    await buttons[0].trigger('click')
    await buttons[2].trigger('click')
    expect(wrapper.find('.favorites').text()).toBe('2 Favoriten')
    expect(buttons[0].attributes('aria-pressed')).toBe('true')
    await buttons[0].trigger('click')
    expect(wrapper.find('.favorites').text()).toBe('1 Favorit')
    expect(buttons[0].attributes('aria-pressed')).toBe('false')
  })

  it('behält die Favoriten beim Wechsel der Seite', async () => {
    const wrapper = mount(App)
    await flushPromises()
    await wrapper.findAll('button.favorite')[1].trigger('click')
    let changed = nextHashChange()
    location.hash = '#/items/2'
    await changed
    changed = nextHashChange()
    location.hash = '#/'
    await changed
    await flushPromises()
    expect(wrapper.findAll('button.favorite')[1].attributes('aria-pressed')).toBe('true')
    expect(wrapper.find('.favorites').text()).toBe('1 Favorit')
  })
})
