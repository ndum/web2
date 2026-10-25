import { enableAutoUnmount, flushPromises, mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import App from '../src/App.vue'
import router from '../src/router/index.js'

enableAutoUnmount(afterEach)

let pinia

beforeEach(() => {
  localStorage.clear()
  sessionStorage.clear()
  pinia = createPinia()
  setActivePinia(pinia)
})

async function visit(path) {
  await router.push(path)
  const wrapper = mount(App, { global: { plugins: [router, pinia] } })
  await flushPromises()
  return wrapper
}

describe('Getting started, favorites in localStorage', () => {
  it('writes the favorites to localStorage as JSON', async () => {
    const wrapper = await visit('/')
    const buttons = wrapper.findAll('.catalog button.favorite')
    await buttons[5].trigger('click')
    await buttons[0].trigger('click')
    await flushPromises()
    expect(JSON.parse(localStorage.getItem('lorraine-commons-favorites'))).toEqual([6, 1])
  })

  it('reads the favorites again on start', async () => {
    localStorage.setItem('lorraine-commons-favorites', '[6, 2]')
    const wrapper = await visit('/')
    expect(wrapper.find('.count').text()).toBe('Favorites: 2')
    expect(wrapper.findAll('.catalog button.favorite')[1].attributes('aria-pressed')).toBe('true')
  })

  it('starts without favorites for a damaged entry', async () => {
    localStorage.setItem('lorraine-commons-favorites', '{')
    const wrapper = await visit('/')
    expect(wrapper.find('.count').text()).toBe('Favorites: 0')
  })
})
