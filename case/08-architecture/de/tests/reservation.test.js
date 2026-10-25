import { enableAutoUnmount, flushPromises } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import items from '../data/items.json'
import { validateRequest } from '../src/features/reservations/rules.js'
import router from '../src/router/index.js'
import { callsOf } from './fake-api.js'
import { api, visit } from './visit.js'

enableAutoUnmount(afterEach)

const drill = items[0]
const tent = items[1]
// Monday, 2 November 2026
const monday = '2026-11-02'

describe('Regeln der Reservationsanfrage', () => {
  const check = (request, item = drill) => validateRequest({ from: '', to: '', ...request }, item, monday)

  it('nimmt eine Anfrage von Mittwoch bis Samstag an', () => {
    expect(check({ from: '2026-11-18', to: '2026-11-21' })).toEqual({})
  })

  it('lehnt Tage vor der Rückgabe und mehr als sieben Tage ab', () => {
    expect(check({ from: '2026-11-11', to: '2026-11-14' }, tent)).toHaveProperty('from')
    expect(check({ from: '2026-11-18', to: '2026-11-28' })).toHaveProperty('to')
  })

  // The mistake came back once after a change, this test keeps it from coming back again
  it('lehnt einen ersten Tag in der Vergangenheit ab', () => {
    expect(check({ from: '2026-10-31', to: '2026-11-04' })).toEqual({ from: 'Der erste Tag liegt in der Vergangenheit.' })
  })
})

describe('Die Anfrage an die Kurs-API', () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ['Date'] })
    vi.setSystemTime(new Date('2026-11-02T09:00:00Z'))
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.useRealTimers()
    localStorage.clear()
    sessionStorage.clear()
    document.body.innerHTML = ''
  })

  async function fillIn(wrapper, from = '2026-11-21', to = '2026-11-25') {
    await wrapper.find('#from').setValue(from)
    await wrapper.find('#to').setValue(to)
    await wrapper.find('form').trigger('submit')
  }

  const dialog = () => document.body.querySelector('[role="dialog"]')

  async function confirm() {
    dialog().querySelector('button.confirm').click()
    await flushPromises()
  }

  it('verlangt für eine Anfrage eine Anmeldung', async () => {
    const wrapper = await visit('/items/1')
    expect(wrapper.find('form').exists()).toBe(false)
    expect(wrapper.find('.sign-in-hint a').attributes('href')).toBe('/login?redirect=/items/1')
  })

  it('nennt im Dialog die Nummer der Anmeldung', async () => {
    const wrapper = await visit('/items/6', { member: 'M-117', attachTo: document.body })
    expect(wrapper.find('#member').exists()).toBe(false)
    await fillIn(wrapper)
    expect(dialog().closest('main')).toBeNull()
    expect(dialog().textContent).toContain('M-117')
  })

  it('schickt die Anfrage nach dem Bestätigen an die API', async () => {
    const wrapper = await visit('/items/6', { member: 'M-117', attachTo: document.body })
    await fillIn(wrapper)
    await confirm()
    expect(callsOf(api.fetch)).toContain('POST /reservations')
    expect(api.state.requests).toEqual([{ id: 'R-1', member: 'M-117', itemId: 6, from: '2026-11-21', to: '2026-11-25', note: '' }])
    expect(wrapper.find('.request-summary').text()).toBe(
      'Anfrage R-1 für Beamer vom 21.11.2026 bis 25.11.2026 gesendet.',
    )
    expect(wrapper.find('#from').element.value).toBe('')
    expect(wrapper.find('.own-requests').text()).toContain('Schon angefragt: 21.11.2026 bis 25.11.2026')
    expect(wrapper.find('nav').text()).toContain('Meine Anfragen (1)')
  })

  it('zeigt die Meldung der API, wenn die Tage schon angefragt sind', async () => {
    const requests = [{ id: 'R-1', member: 'M-204', itemId: 6, from: '2026-11-21', to: '2026-11-25', note: '' }]
    const wrapper = await visit('/items/6', { member: 'M-117', requests, attachTo: document.body })
    await fillIn(wrapper, '2026-11-25', '2026-11-28')
    await confirm()
    expect(wrapper.find('.send-error').text()).toBe('Das Ding ist an einigen dieser Tage schon angefragt.')
    expect(wrapper.find('#from').element.value).toBe('2026-11-25')
  })

  it('behält einen Entwurf im Tab über das Neuladen und löscht ihn nach dem Senden', async () => {
    const first = await visit('/items/6', { member: 'M-117', attachTo: document.body })
    await first.find('#note').setValue('Für den Vereinsabend')
    await flushPromises()
    expect(JSON.parse(sessionStorage.getItem('lorraine-commons-draft-6')).note).toBe('Für den Vereinsabend')
    first.unmount()
    const second = await visit('/items/6', { member: 'M-117', attachTo: document.body })
    expect(second.find('#note').element.value).toBe('Für den Vereinsabend')
    await fillIn(second)
    await confirm()
    expect(sessionStorage.getItem('lorraine-commons-draft-6')).toBe(null)
  })

  it('lässt die Seite ohne Rückfrage gehen, der Entwurf bleibt', async () => {
    const ask = vi.fn(() => false)
    vi.stubGlobal('confirm', ask)
    const wrapper = await visit('/items/6', { member: 'M-117', attachTo: document.body })
    await wrapper.find('#from').setValue('2026-11-21')
    await router.push('/')
    await router.push('/items/6')
    await flushPromises()
    expect(ask).not.toHaveBeenCalled()
    expect(wrapper.find('#from').element.value).toBe('2026-11-21')
  })
})
