import { enableAutoUnmount, flushPromises, mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'

import App from '../src/App.vue'
import { signIn, signOut } from '../src/auth.js'
import router from '../src/router/index.js'
import TeamView from '../src/views/TeamView.vue'

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

describe('Getting started, a guard for the team area', () => {
  it('sends signed-out visitors to the login and keeps the target', async () => {
    const wrapper = await visit('/team')
    expect(router.currentRoute.value.name).toBe('login')
    expect(router.currentRoute.value.query.redirect).toBe('/team')
    expect(wrapper.find('h1').text()).toBe('Sign in')
  })

  it('sends members without a team account there as well', async () => {
    signIn('M-204')
    await visit('/team')
    expect(router.currentRoute.value.name).toBe('login')
  })

  it('lets the team in', async () => {
    signIn('M-117')
    const wrapper = await visit('/team')
    expect(wrapper.find('h1').text()).toBe('Team at the counter')
  })

  it('checks the field in meta instead of the name of the route', async () => {
    // A new page of the team needs no change in the guard
    const removeRoute = router.addRoute({ path: '/team/stock', component: TeamView, meta: { requiresTeam: true } })
    try {
      await visit('/team/stock')
      expect(router.currentRoute.value.name).toBe('login')
      expect(router.currentRoute.value.query.redirect).toBe('/team/stock')
    } finally {
      removeRoute()
    }
  })
})
