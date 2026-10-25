import { enableAutoUnmount, flushPromises, mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'

import App from '../src/App.vue'
import router from '../src/router/index.js'
import routerSource from '../src/router/index.js?raw'

enableAutoUnmount(afterEach)

// Goes to an address and shows App there, as if someone had typed the address into the browser
async function visit(path, options = {}) {
  await router.push(path)
  const wrapper = mount(App, { global: { plugins: [router] }, ...options })
  await flushPromises()
  return wrapper
}

describe('Going further, the team area loads on demand', () => {
  it('loads the component of the team only when it opens', () => {
    const team = router.getRoutes().find((route) => route.path === '/team')
    expect(typeof team.components.default, 'TeamView still loads at start').toBe('function')
    expect(routerSource).toMatch(/import\(/)
  })

  it('still shows the area', async () => {
    expect((await visit('/team')).find('h1').text()).toBe('Team at the counter')
  })
})
