import { enableAutoUnmount, flushPromises, mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'

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

// Fills in the member number on the login page and sends the form
async function signInOn(path, number = 'M-117') {
  const wrapper = await visit(path)
  await wrapper.find('#member').setValue(number)
  await wrapper.find('form').trigger('submit')
  await flushPromises()
  return wrapper
}

describe('Vertiefung, zurück zum Ziel nach der Anmeldung', () => {
  it('führt nach der Anmeldung zum gemerkten Ziel', async () => {
    await signInOn('/login?redirect=/team')
    expect(router.currentRoute.value.fullPath).toBe('/team')
  })

  it('führt ohne Ziel zum Katalog', async () => {
    await signInOn('/login')
    expect(router.currentRoute.value.fullPath).toBe('/')
  })

  it('nimmt nur Ziele innerhalb der App', async () => {
    await signInOn('/login?redirect=https://example.com')
    expect(router.currentRoute.value.fullPath).toBe('/')
    signOut()
    await signInOn('/login?redirect=//example.com')
    expect(router.currentRoute.value.fullPath).toBe('/')
  })

  it('meldet eine unbekannte Nummer', async () => {
    const wrapper = await signInOn('/login?redirect=/team', 'M-999')
    expect(router.currentRoute.value.name).toBe('login')
    expect(wrapper.find('.error').text()).toBe('Diese Mitgliedernummer kennen wir nicht.')
  })
})
