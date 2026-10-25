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

function changeInAnotherTab(key, value) {
  // The browser fires the event only in the other tabs, the test fires it itself
  localStorage.setItem(key, value)
  window.dispatchEvent(new StorageEvent('storage', { key, newValue: value, storageArea: localStorage }))
}

describe('[%Vertiefung, Favoriten in mehreren Tabs|Going further, favorites in several tabs%]', () => {
  it('[%folgt einer Änderung in einem anderen Tab|follows a change in another tab%]', async () => {
    const wrapper = await visit('/')
    changeInAnotherTab('lorraine-commons-favorites', '[1, 2, 6]')
    await flushPromises()
    expect(wrapper.find('.count').text()).toBe('[%Favoriten|Favorites%]: 3')
  })

  it('[%übergeht andere Schlüssel|ignores other keys%]', async () => {
    const wrapper = await visit('/')
    changeInAnotherTab('lorraine-commons-search', '"zelt"')
    await flushPromises()
    expect(wrapper.find('.count').text()).toBe('[%Favoriten|Favorites%]: 0')
  })
})
