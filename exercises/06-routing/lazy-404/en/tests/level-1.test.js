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

describe('Getting started, a page for unknown addresses', () => {
  it('shows the right page for an unknown address', async () => {
    const wrapper = await visit('/club-night/2026')
    expect(router.currentRoute.value.name).toBe('not-found')
    expect(router.currentRoute.value.params.pathMatch).toEqual(['club-night', '2026'])
    expect(wrapper.find('h1').text()).toBe('Page not found')
  })

  it('leads back to the catalog from there', async () => {
    const wrapper = await visit('/does-not-exist')
    await wrapper.find('main a').trigger('click')
    await flushPromises()
    expect(wrapper.find('h1').text()).toBe('Catalog')
  })

  it('shows it for an id made of letters too', async () => {
    expect((await visit('/items/projector')).find('h1').text()).toBe('Page not found')
    expect((await visit('/items/999')).text()).toContain('This thing does not exist.')
  })
})
