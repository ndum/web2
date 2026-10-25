import { enableAutoUnmount, flushPromises } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { createMemoryApi } from '../src/api/memory.js'
import router from '../src/router/index.js'
import { cardNames, createTestPinia, mountApp } from './visit.js'

enableAutoUnmount(afterEach)

afterEach(() => {
  vi.unstubAllGlobals()
  sessionStorage.clear()
  localStorage.clear()
})

describe('Die Demo ohne Server', () => {
  it('zeigt den Katalog mit der Attrappe, ohne fetch aufzurufen', async () => {
    const fetch = vi.fn(() => Promise.reject(new TypeError('no network')))
    vi.stubGlobal('fetch', fetch)
    await router.push('/')
    const wrapper = mountApp(createTestPinia(createMemoryApi()))
    await flushPromises()
    expect(cardNames(wrapper)).toHaveLength(60)
    expect(fetch).not.toHaveBeenCalled()
  })

  it('meldet sich mit der Attrappe an und zeigt das Team', async () => {
    await router.push('/login')
    const wrapper = mountApp(createTestPinia(createMemoryApi()))
    await flushPromises()
    await wrapper.find('#member-number').setValue('M-117')
    await wrapper.find('form').trigger('submit')
    await flushPromises()
    expect(wrapper.find('nav').text()).toContain('Team')
  })
})
