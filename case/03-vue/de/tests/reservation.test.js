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

  it('prüft die Mitgliedernummer', () => {
    expect(check({ member: 'M-1170', from: '2026-11-18', to: '2026-11-21' })).toHaveProperty('member')
  })

  it('lehnt Tage in der Vergangenheit und vor der Rückgabe ab', () => {
    expect(check({ from: '2026-10-31', to: '2026-11-04' })).toHaveProperty('from')
    expect(check({ from: '2026-11-11', to: '2026-11-14' }, tent).from).toBe('Das Ding ist erst ab 12.11.2026 wieder da.')
    expect(check({ from: '2026-11-14', to: '2026-11-18' }, tent)).toEqual({})
  })

  it('verlangt Öffnungstage und höchstens sieben Tage', () => {
    expect(check({ from: '2026-11-19', to: '2026-11-21' })).toHaveProperty('from')
    expect(check({ from: '2026-11-18', to: '2026-11-23' })).toHaveProperty('to')
    expect(check({ from: '2026-11-18', to: '2026-11-28' }).to).toBe('Eine Ausleihe dauert höchstens sieben Tage.')
    expect(check({ from: '2026-11-21', to: '2026-11-18' }).to).toBe('Der letzte Tag liegt vor dem ersten.')
  })
})

describe('Das Formular auf der Seite eines Dings', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn(async () => new Response(JSON.stringify(items))))
    vi.useFakeTimers({ toFake: ['Date'] })
    vi.setSystemTime(new Date('2026-11-02T09:00:00Z'))
    location.hash = '#/items/6'
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.useRealTimers()
    location.hash = ''
  })

  async function send({ member = '', from = '', to = '', note = '' } = {}) {
    const wrapper = mount(App)
    await flushPromises()
    await wrapper.find('#member').setValue(member)
    await wrapper.find('#from').setValue(from)
    await wrapper.find('#to').setValue(to)
    await wrapper.find('#note').setValue(note)
    await wrapper.find('form').trigger('submit')
    return wrapper
  }

  it('erfasst eine gültige Anfrage und leert das Formular', async () => {
    const wrapper = await send({ member: ' M-204 ', from: '2026-11-21', to: '2026-11-25', note: 'Für ein Quartierfest' })
    expect(wrapper.find('.request-summary').text()).toBe(
      'Reservationsanfrage von M-204 für Beamer vom 21.11.2026 bis 25.11.2026 erfasst. Notiz: Für ein Quartierfest',
    )
    expect(wrapper.find('#member').element.value).toBe('')
  })

  it('zeigt Meldungen erst nach dem Verlassen eines Felds oder dem Senden', async () => {
    const wrapper = mount(App)
    await flushPromises()
    expect(wrapper.findAll('.error')).toHaveLength(0)
    await wrapper.find('#member').trigger('blur')
    expect(wrapper.find('#member-error').exists()).toBe(true)
    expect(wrapper.find('#member').attributes('aria-describedby')).toBe('member-error')
    await wrapper.find('form').trigger('submit')
    expect(wrapper.findAll('.error')).toHaveLength(3)
    expect(wrapper.find('.request-summary').text()).toBe('')
  })
})
