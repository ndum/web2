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

describe('Meine Anfragen', () => {
  it('zeigt nach der Anmeldung die eigenen Anfragen der API', async () => {
    const wrapper = await visit('/reservations', { member: 'M-204', requests: REQUESTS })
    expect(callsOf(api.fetch)).toContain('GET /reservations')
    const entries = wrapper.findAll('.requests li').map((entry) => entry.text().replace(/\s+/g, ' '))
    expect(entries).toEqual([
      'Beamer, 21.11.2026 bis 25.11.2026 Zurückziehen',
      'Bohrmaschine, 28.11.2026 bis 2.12.2026 Zurückziehen',
    ])
    expect(wrapper.find('nav').text()).toContain('Meine Anfragen (2)')
  })

  it('zieht eine Anfrage bei der API zurück', async () => {
    const wrapper = await visit('/reservations', { member: 'M-204', requests: REQUESTS })
    await wrapper.find('.requests li button').trigger('click')
    await flushPromises()
    expect(callsOf(api.fetch)).toContain('DELETE /reservations/R-1')
    expect(wrapper.findAll('.requests li')).toHaveLength(1)
    expect(wrapper.find('.message').text()).toBe('Anfrage R-1 zurückgezogen.')
  })

  it('zeigt eine leere Liste mit einem Weg in den Katalog', async () => {
    const wrapper = await visit('/reservations', { member: 'M-117' })
    expect(wrapper.text()).toContain('Noch keine Anfragen.')
    expect(wrapper.find('section a[href="/"]').exists()).toBe(true)
  })

  it('bittet Abgemeldete um eine Anmeldung', async () => {
    const wrapper = await visit('/reservations')
    expect(wrapper.find('section a').attributes('href')).toBe('/login?redirect=/reservations')
    expect(wrapper.find('nav').text()).not.toContain('Meine Anfragen')
  })

  it('behält nach dem Abmelden keine Anfrage im Speicher', async () => {
    const wrapper = await visit('/reservations', { member: 'M-204', requests: REQUESTS })
    await wrapper.find('button.sign-out').trigger('click')
    await flushPromises()
    expect(useReservationsStore().list).toEqual([])
    expect(wrapper.find('nav').text()).not.toContain('Meine Anfragen')
  })
})
