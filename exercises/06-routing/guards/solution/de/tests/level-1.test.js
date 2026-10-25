import { enableAutoUnmount, flushPromises, mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'

import App from '../src/App.vue'
import { signIn, signOut } from '../src/auth.js'
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

describe('Einstieg, ein Guard für den Bereich des Teams', () => {
  it('schickt Abgemeldete auf die Anmeldung und merkt sich das Ziel', async () => {
    const wrapper = await visit('/team')
    expect(router.currentRoute.value.name).toBe('login')
    expect(router.currentRoute.value.query.redirect).toBe('/team')
    expect(wrapper.find('h1').text()).toBe('Anmelden')
  })

  it('schickt auch Mitglieder ohne Konto des Teams dorthin', async () => {
    signIn('M-204')
    await visit('/team')
    expect(router.currentRoute.value.name).toBe('login')
  })

  it('lässt das Team hinein', async () => {
    signIn('M-117')
    const wrapper = await visit('/team')
    expect(wrapper.find('h1').text()).toBe('Team am Tresen')
  })
})
