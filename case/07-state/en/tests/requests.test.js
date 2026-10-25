import { enableAutoUnmount, flushPromises } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { useReservationsStore } from '../src/stores/reservations.js'
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

const REQUESTS = [
  { id: 'R-1', member: 'M-204', itemId: 6, from: '2026-11-21', to: '2026-11-25', note: '' },
  { id: 'R-2', member: 'M-204', itemId: 1, from: '2026-11-28', to: '2026-12-02', note: '' },
  { id: 'R-3', member: 'M-117', itemId: 2, from: '2026-11-14', to: '2026-11-18', note: '' },
]

describe('My requests', () => {
  it('shows the own requests of the API after the login', async () => {
    const wrapper = await visit('/reservations', { member: 'M-204', requests: REQUESTS })
    expect(callsOf(api.fetch)).toContain('GET /reservations')
    const entries = wrapper.findAll('.requests li').map((entry) => entry.text().replace(/\s+/g, ' '))
    expect(entries).toEqual([
      'Projector, 11/21/2026 to 11/25/2026 Withdraw',
      'Drill, 11/28/2026 to 12/2/2026 Withdraw',
    ])
    expect(wrapper.find('nav').text()).toContain('My requests (2)')
  })

  it('withdraws a request at the API', async () => {
    const wrapper = await visit('/reservations', { member: 'M-204', requests: REQUESTS })
    await wrapper.find('.requests li button').trigger('click')
    await flushPromises()
    expect(callsOf(api.fetch)).toContain('DELETE /reservations/R-1')
    expect(wrapper.findAll('.requests li')).toHaveLength(1)
    expect(wrapper.find('.message').text()).toBe('Request R-1 withdrawn.')
  })

  it('shows an empty list with a way into the catalog', async () => {
    const wrapper = await visit('/reservations', { member: 'M-117' })
    expect(wrapper.text()).toContain('No requests yet.')
    expect(wrapper.find('section a[href="/"]').exists()).toBe(true)
  })

  it('asks signed-out visitors to sign in', async () => {
    const wrapper = await visit('/reservations')
    expect(wrapper.find('section a').attributes('href')).toBe('/login?redirect=/reservations')
    expect(wrapper.find('nav').text()).not.toContain('My requests')
  })

  it('keeps no request in memory after signing out', async () => {
    const wrapper = await visit('/reservations', { member: 'M-204', requests: REQUESTS })
    await wrapper.find('button.sign-out').trigger('click')
    await flushPromises()
    expect(useReservationsStore().list).toEqual([])
    expect(wrapper.find('nav').text()).not.toContain('My requests')
  })
})
