import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import items from '../data/items.json'
import App from '../src/App.vue'
import { validateRequest } from '../src/reservation.js'

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
    vi.stubGlobal('fetch', vi.fn(async () => new Response(JSON.stringify(items))))
    vi.useFakeTimers({ toFake: ['Date'] })
    vi.setSystemTime(new Date('2026-11-02T09:00:00Z'))
    location.hash = '#/items/6'
    wrapper = mount(App, { attachTo: document.body })
    await flushPromises()
  })

  afterEach(() => {
    wrapper.unmount()
    vi.unstubAllGlobals()
    vi.useRealTimers()
    location.hash = ''
    document.body.innerHTML = ''
  })

  async function send(from, to) {
    await wrapper.find('#from').setValue(from)
    await wrapper.find('#to').setValue(to)
    await wrapper.find('form').trigger('submit')
  }

  const dialog = () => document.body.querySelector('[role="dialog"]')

  it('zeigt das angemeldete Mitglied im Kopf und im Formular', () => {
    expect(wrapper.find('.member').text()).toBe('Angemeldet als Martina Hostettler')
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
    expect(wrapper.find('#member').element.value).toBe('M-117')
  })

  it('schliesst den Dialog mit «Zurück», ohne etwas zu erfassen', async () => {
    await send('2026-11-21', '2026-11-25')
    dialog().querySelector('button.back').click()
    await flushPromises()
    expect(dialog()).toBeNull()
    expect(wrapper.find('.request-summary').text()).toBe('')
    expect(wrapper.find('#from').element.value).toBe('2026-11-21')
  })
})
