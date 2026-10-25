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

describe('Getting started, the layout of the team', () => {
  it('shows the heading and the loans at /team', async () => {
    const wrapper = await visit('/team')
    expect(wrapper.find('h1').text()).toBe('Team at the counter')
    expect(wrapper.findAll('.loans li')).toHaveLength(11)
    expect(wrapper.find('.loans li').text()).toBe('Beer bench set, back from 11/3/2026')
  })

  it('builds /team from the layout and a child route', () => {
    const matched = router.resolve('/team').matched
    expect(matched, '/team has no child route yet').toHaveLength(2)
    expect(matched[0].components.default.__name).toBe('TeamLayout')
    expect(matched[1].components.default.__name).toBe('TeamLoansView')
  })
})
