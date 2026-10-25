import { enableAutoUnmount, flushPromises } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import items from '../data/items.json'
import { signIn, signOut } from '../src/auth.js'
import { validateRequest } from '../src/reservation.js'
import router from '../src/router/index.js'
import { visit } from './visit.js'

enableAutoUnmount(afterEach)

const drill = items[0]
const tent = items[1]
// Monday, 2 November 2026
const monday = '2026-11-02'

describe('Regeln der Reservationsanfrage', () => {
  const check = (request, item = drill) => validateRequest({ member: 'M-117', from: '', to: '', ...request }, item, monday)

  it('nimmt eine Anfrage von Mittwoch bis Samstag an', () => {
    expect(check({ from: '2026-11-18', to: '2026-11-21' })).toEqual({})
  })

  it('lehnt Tage vor der Rückgabe und mehr als sieben Tage ab', () => {
    expect(check({ from: '2026-11-11', to: '2026-11-14' }, tent)).toHaveProperty('from')
    expect(check({ from: '2026-11-18', to: '2026-11-28' })).toHaveProperty('to')
  })
})

describe('Das Formular mit Dialog und angemeldetem Mitglied', () => {
  let wrapper

  beforeEach(async () => {
    vi.useFakeTimers({ toFake: ['Date'] })
    vi.setSystemTime(new Date('2026-11-02T09:00:00Z'))
    signIn('M-117')
    wrapper = await visit('/items/6', { attachTo: document.body })
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.useRealTimers()
    signOut()
    document.body.innerHTML = ''
  })

  async function send(from, to) {
    await wrapper.find('#from').setValue(from)
    await wrapper.find('#to').setValue(to)
    await wrapper.find('form').trigger('submit')
  }

  const dialog = () => document.body.querySelector('[role="dialog"]')

  it('füllt die Nummer des angemeldeten Mitglieds aus', () => {
    expect(wrapper.find('.member').text()).toContain('Angemeldet als Martina Hostettler')
    expect(wrapper.find('#member').element.value).toBe('M-117')
  })

  it('fragt vor dem Erfassen in einem Dialog am Ende der Seite nach', async () => {
    await send('2026-11-21', '2026-11-25')
    expect(dialog()).not.toBeNull()
    expect(dialog().closest('main')).toBeNull()
    expect(dialog().textContent).toContain('M-117')
    expect(wrapper.find('.request-summary').text()).toBe('')
  })

  it('erfasst die Anfrage nach dem Bestätigen und leert das Formular', async () => {
    await send('2026-11-21', '2026-11-25')
    dialog().querySelector('button.confirm').click()
    await flushPromises()
    expect(dialog()).toBeNull()
    expect(wrapper.find('.request-summary').text()).toBe(
      'Reservationsanfrage von M-117 für Beamer vom 21.11.2026 bis 25.11.2026 erfasst.',
    )
    expect(wrapper.find('#from').element.value).toBe('')
  })

  it('warnt vor dem Verlassen eines halb ausgefüllten Formulars', async () => {
    const confirm = vi.fn(() => false)
    vi.stubGlobal('confirm', confirm)
    await wrapper.find('#from').setValue('2026-11-21')
    await router.push('/')
    expect(confirm).toHaveBeenCalledOnce()
    expect(router.currentRoute.value.fullPath).toBe('/items/6')
    confirm.mockReturnValue(true)
    await router.push('/')
    expect(router.currentRoute.value.fullPath).toBe('/')
  })
})

describe('Das Formular ohne Anmeldung', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('lässt die Mitgliedernummer leer', async () => {
    const wrapper = await visit('/items/1')
    expect(wrapper.find('#member').element.value).toBe('')
    expect(wrapper.find('.sign-in').text()).toBe('Anmelden')
  })
})
