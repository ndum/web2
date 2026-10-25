import { enableAutoUnmount, flushPromises, mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import items from '../data/items.json'
import App from '../src/App.vue'
import router from '../src/router/index.js'
import { calls, fakeApi } from './fake-api.js'

enableAutoUnmount(afterEach)

let pinia

beforeEach(() => {
  pinia = createPinia()
  setActivePinia(pinia)
})

afterEach(() => {
  vi.unstubAllGlobals()
})

async function visit(path) {
  await router.push(path)
  const wrapper = mount(App, { global: { plugins: [router, pinia] } })
  await flushPromises()
  return wrapper
}

describe('Einstieg, der Katalog von der Kurs-API', () => {
  it('lädt den Katalog von der Kurs-API', async () => {
    const fetch = fakeApi({ 'GET /items': () => [200, items] })
    const wrapper = await visit('/')
    expect(calls(fetch)).toEqual(['GET /api/de/items'])
    expect(wrapper.findAll('.catalog li')).toHaveLength(60)
  })

  it('zeigt, dass der Katalog lädt', async () => {
    fakeApi({ 'GET /items': () => new Promise(() => {}) })
    const wrapper = await visit('/')
    expect(wrapper.find('[role="status"]').text()).toBe('Der Katalog wird geladen …')
  })

  it('meldet einen Fehler und lädt auf Wunsch neu', async () => {
    let status = 503
    fakeApi({ 'GET /items': () => [status, status === 200 ? items : { error: 'busy' }] })
    const wrapper = await visit('/')
    expect(wrapper.find('[role="alert"]').text()).toContain('Die Kurs-API antwortet mit dem Status 503.')
    status = 200
    await wrapper.find('[role="alert"] button').trigger('click')
    await flushPromises()
    expect(wrapper.findAll('.catalog li')).toHaveLength(60)
  })
})
