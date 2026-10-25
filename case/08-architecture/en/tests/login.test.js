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

describe('The login at the course API', () => {
  it('sends signed-out visitors to the login and keeps the target', async () => {
    const wrapper = await visit('/team/returns')
    expect(router.currentRoute.value.name).toBe('login')
    expect(router.currentRoute.value.query.redirect).toBe('/team/returns')
    expect(wrapper.find('nav').text()).not.toContain('Team')
  })

  it('signs the team in at the API and leads it to the kept target', async () => {
    const wrapper = await signInOn('/login?redirect=/team/returns', 'm-117')
    // The team area loads on demand, the navigation ends a little later
    await vi.waitFor(() => expect(router.currentRoute.value.fullPath).toBe('/team/returns'))
    expect(callsOf(api.fetch)).toContain('POST /session')
    expect(wrapper.find('.member').text()).toContain('Signed in as Martina Hostettler')
    expect(wrapper.find('nav a[href="/team"]').exists()).toBe(true)
  })

  it('shows the message of the API for an unknown number', async () => {
    const wrapper = await signInOn('/login', 'M-999')
    expect(router.currentRoute.value.name).toBe('login')
    expect(wrapper.find('.error').text()).toBe('We do not know this member number.')
  })

  it('tells members without a team account why they end on the login', async () => {
    const wrapper = await visit('/team', { member: 'M-204' })
    expect(router.currentRoute.value.name).toBe('login')
    expect(wrapper.find('.notice').text()).toBe('You are signed in as member M-204. The team area needs a team account.')
  })

  it('accepts only targets inside the app', async () => {
    await signInOn('/login?redirect=//example.com', 'M-117')
    expect(router.currentRoute.value.fullPath).toBe('/')
  })

  it('stays signed in after a reload and asks the API once for it', async () => {
    const wrapper = await visit('/team', { member: 'M-117' })
    expect(router.currentRoute.value.name).toBe('team-loans')
    expect(wrapper.find('.member').text()).toContain('Martina Hostettler')
    expect(callsOf(api.fetch).filter((call) => call === 'GET /session')).toHaveLength(1)
  })

  it('signs out at the API and leads from the team area to the catalog', async () => {
    const wrapper = await visit('/team', { member: 'M-117' })
    await wrapper.find('button.sign-out').trigger('click')
    await flushPromises()
    expect(api.state.member).toBe(null)
    expect(router.currentRoute.value.name).toBe('catalog')
    expect(wrapper.find('.sign-in').exists()).toBe(true)
  })
})
