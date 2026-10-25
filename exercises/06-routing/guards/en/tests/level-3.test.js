import { enableAutoUnmount, flushPromises, mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'

import App from '../src/App.vue'
import { signOut } from '../src/auth.js'
import router from '../src/router/index.js'

enableAutoUnmount(afterEach)

afterEach(() => {
  signOut()
})

async function visit(path) {
  await router.push(path)
  const wrapper = mount(App, { global: { plugins: [router] } })
  await flushPromises()
  return wrapper
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('Challenge, a warning before leaving the form', () => {
  it('asks for a half-filled form and stays on no', async () => {
    // The test answers the question of the browser in place of a person
    const confirm = vi.fn(() => false)
    vi.stubGlobal('confirm', confirm)
    const wrapper = await visit('/items/6')
    await wrapper.find('#from').setValue('2026-11-21')
    await router.push('/')
    expect(confirm).toHaveBeenCalledOnce()
    expect(router.currentRoute.value.fullPath).toBe('/items/6')
  })

  it('leaves the page on yes', async () => {
    vi.stubGlobal('confirm', vi.fn(() => true))
    const wrapper = await visit('/items/6')
    await wrapper.find('#note').setValue('With cable')
    await router.push('/')
    expect(router.currentRoute.value.fullPath).toBe('/')
  })

  it('does not ask for an empty form', async () => {
    const confirm = vi.fn(() => true)
    vi.stubGlobal('confirm', confirm)
    await visit('/items/6')
    await router.push('/')
    expect(confirm).not.toHaveBeenCalled()
    expect(router.currentRoute.value.fullPath).toBe('/')
  })
})
