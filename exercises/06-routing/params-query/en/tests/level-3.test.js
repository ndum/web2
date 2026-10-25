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

describe('Challenge, the sort order in the address', () => {
  it('sorts by name without a choice', async () => {
    expect(names(await visit('/')).slice(0, 2)).toEqual(['Baby carrier', 'Backpack 65 liters'])
  })

  it('sorts by deposit and then by name with sort=deposit', async () => {
    const wrapper = await visit('/?sort=deposit')
    expect(wrapper.find('#sort').element.value).toBe('deposit')
    expect(names(wrapper)[0]).toBe('Board game box')
    expect(names(wrapper).at(-1)).toBe('Projector')
  })

  it('keeps the search when sorting', async () => {
    const wrapper = await visit('/?q=tent')
    await wrapper.find('#sort').setValue('deposit')
    await flushPromises()
    expect(router.currentRoute.value.query).toEqual({ q: 'tent', sort: 'deposit' })
    expect(names(wrapper)).toEqual(['Tent for two', 'Tent for four', 'Party tent'])
  })
})
