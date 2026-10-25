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

describe('Going further, the returns as a second child route', () => {
  it('shows the returns inside the layout at /team/returns', async () => {
    const wrapper = await visit('/team/returns')
    expect(router.resolve('/team/returns').matched).toHaveLength(2)
    expect(wrapper.find('h1').text()).toBe('Team at the counter')
    expect(wrapper.find('h2').text()).toBe('Returns')
  })

  it('switches between the child pages with the navigation of the layout', async () => {
    const wrapper = await visit('/team/returns')
    const links = wrapper.findAll('.team-nav a')
    expect(links.map((link) => link.attributes('href'))).toEqual(['/team', '/team/returns'])
    expect(links[1].attributes('aria-current')).toBe('page')
    expect(links[0].attributes('aria-current')).toBeUndefined()
    await links[0].trigger('click')
    await flushPromises()
    expect(wrapper.findAll('.loans li')).toHaveLength(11)
  })

  it('records a return', async () => {
    const wrapper = await visit('/team/returns')
    await wrapper.find('form').trigger('submit')
    expect(wrapper.find('.message').text()).toBe('Return of Tent for four recorded.')
  })
})
