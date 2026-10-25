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

const names = (wrapper) => wrapper.findAll('.catalog .name').map((name) => name.text())

describe('Going further, the search in the address', () => {
  it('filters by q from the address', async () => {
    const wrapper = await visit('/?q=tent')
    expect(wrapper.find('#search').element.value).toBe('tent')
    expect(names(wrapper)).toHaveLength(3)
  })

  it('writes the search text into the address as q', async () => {
    const wrapper = await visit('/')
    await wrapper.find('#search').setValue('saw')
    await flushPromises()
    expect(router.currentRoute.value.query.q).toBe('saw')
    expect(names(wrapper)).toHaveLength(2)
  })

  it('removes q from the address for an empty field', async () => {
    const wrapper = await visit('/?q=tent')
    await wrapper.find('#search').setValue('')
    await flushPromises()
    expect(router.currentRoute.value.fullPath).toBe('/')
    expect(names(wrapper)).toHaveLength(60)
  })
})
