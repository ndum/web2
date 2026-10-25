import { enableAutoUnmount, flushPromises, mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import App from '../src/App.vue'
import router from '../src/router/index.js'
import { useAuthStore } from '../src/stores/auth.js'

enableAutoUnmount(afterEach)

let pinia

// A fresh Pinia for every test, the router guard uses it as well
beforeEach(() => {
  pinia = createPinia()
  setActivePinia(pinia)
})

async function visit(path) {
  await router.push(path)
  const wrapper = mount(App, { global: { plugins: [router, pinia] } })
  await flushPromises()
  return wrapper
}

describe('Getting started, a store for the login', () => {
  it('signs in and out with the member number', () => {
    const auth = useAuthStore()
    expect(auth.signIn(' m-117 ')).toBe(true)
    expect(auth.member.number).toBe('M-117')
    expect(auth.isTeam).toBe(true)
    auth.signOut()
    expect(auth.member).toBe(null)
    expect(auth.signIn('M-999')).toBe(false)
  })

  it('sends signed-out visitors from the team area to the login', async () => {
    await visit('/team')
    expect(router.currentRoute.value.name).toBe('login')
    useAuthStore().signIn('M-117')
    await router.push('/team')
    expect(router.currentRoute.value.name).toBe('team')
  })

  it('shows the name in the header after the login', async () => {
    const wrapper = await visit('/login')
    await wrapper.find('#member').setValue('M-204')
    await wrapper.find('form').trigger('submit')
    await flushPromises()
    expect(wrapper.find('header').text()).toContain('member M-204')
    expect(useAuthStore().member.number).toBe('M-204')
  })
})
