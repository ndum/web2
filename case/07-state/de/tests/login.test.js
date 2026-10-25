import { enableAutoUnmount, flushPromises } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'

import router from '../src/router/index.js'
import { callsOf } from './fake-api.js'
import { api, visit } from './visit.js'

enableAutoUnmount(afterEach)

afterEach(() => {
  vi.unstubAllGlobals()
  vi.useRealTimers()
  localStorage.clear()
  sessionStorage.clear()
  document.body.innerHTML = ''
})

// Fills in the member number on the login page and sends the form
async function signInOn(path, number) {
  const wrapper = await visit(path)
  await wrapper.find('#member-number').setValue(number)
  await wrapper.find('form').trigger('submit')
  await flushPromises()
  return wrapper
}

describe('Die Anmeldung bei der Kurs-API', () => {
  it('schickt Abgemeldete auf die Anmeldung und merkt sich das Ziel', async () => {
    const wrapper = await visit('/team/returns')
    expect(router.currentRoute.value.name).toBe('login')
    expect(router.currentRoute.value.query.redirect).toBe('/team/returns')
    expect(wrapper.find('nav').text()).not.toContain('Team')
  })

  it('meldet das Team bei der API an und führt es zum gemerkten Ziel', async () => {
    const wrapper = await signInOn('/login?redirect=/team/returns', 'm-117')
    // The team area loads on demand, the navigation ends a little later
    await vi.waitFor(() => expect(router.currentRoute.value.fullPath).toBe('/team/returns'))
    expect(callsOf(api.fetch)).toContain('POST /session')
    expect(wrapper.find('.member').text()).toContain('Angemeldet als Martina Hostettler')
    expect(wrapper.find('nav a[href="/team"]').exists()).toBe(true)
  })

  it('zeigt die Meldung der API für eine unbekannte Nummer', async () => {
    const wrapper = await signInOn('/login', 'M-999')
    expect(router.currentRoute.value.name).toBe('login')
    expect(wrapper.find('.error').text()).toBe('Diese Mitgliedernummer kennen wir nicht.')
  })

  it('sagt Mitgliedern ohne Konto des Teams, warum sie auf der Anmeldung landen', async () => {
    const wrapper = await visit('/team', { member: 'M-204' })
    expect(router.currentRoute.value.name).toBe('login')
    expect(wrapper.find('.notice').text()).toBe('Du bist als Mitglied M-204 angemeldet. Für den Bereich des Teams brauchst du ein Konto des Teams.')
  })

  it('nimmt nur Ziele innerhalb der App', async () => {
    await signInOn('/login?redirect=//example.com', 'M-117')
    expect(router.currentRoute.value.fullPath).toBe('/')
  })

  it('bleibt nach dem Neuladen angemeldet und fragt die API dafür einmal', async () => {
    const wrapper = await visit('/team', { member: 'M-117' })
    expect(router.currentRoute.value.name).toBe('team-loans')
    expect(wrapper.find('.member').text()).toContain('Martina Hostettler')
    expect(callsOf(api.fetch).filter((call) => call === 'GET /session')).toHaveLength(1)
  })

  it('meldet bei der API ab und führt aus dem Bereich des Teams in den Katalog', async () => {
    const wrapper = await visit('/team', { member: 'M-117' })
    await wrapper.find('button.sign-out').trigger('click')
    await flushPromises()
    expect(api.state.member).toBe(null)
    expect(router.currentRoute.value.name).toBe('catalog')
    expect(wrapper.find('.sign-in').exists()).toBe(true)
  })
})
