import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import App from '../src/App.vue'

// The tests run as if today were Monday, 2 November 2026
beforeEach(() => {
  vi.useFakeTimers({ toFake: ['Date'] })
  vi.setSystemTime(new Date('2026-11-02T09:00:00Z'))
})

afterEach(() => {
  vi.useRealTimers()
})

async function send({ member = '', from = '', to = '' } = {}) {
  const wrapper = mount(App)
  await wrapper.find('#member').setValue(member)
  await wrapper.find('#from').setValue(from)
  await wrapper.find('#to').setValue(to)
  await wrapper.find('form').trigger('submit')
  return wrapper
}

describe('Vertiefung, Fehler in den Eingaben', () => {
  it('meldet leere Felder beim Senden und erfasst nichts', async () => {
    const wrapper = await send()
    expect(wrapper.find('#member-error').exists(), 'Zeig die Meldung im Element mit der id member-error').toBe(true)
    expect(wrapper.find('#from-error').text()).toBe('Wähl den ersten Tag.')
    expect(wrapper.find('#to-error').text()).toBe('Wähl den letzten Tag.')
    expect(wrapper.find('.summary').text()).toBe('')
  })

  it('prüft die Form der Mitgliedernummer', async () => {
    const wrapper = await send({ member: 'M-11', from: '2026-11-18', to: '2026-11-21' })
    expect(wrapper.find('#member-error').text()).toBe('Die Mitgliedernummer hat die Form M-117.')
  })

  it('lehnt einen ersten Tag in der Vergangenheit ab', async () => {
    const wrapper = await send({ member: 'M-117', from: '2026-10-31', to: '2026-11-04' })
    expect(wrapper.find('#from-error').text()).toBe('Der erste Tag liegt in der Vergangenheit.')
  })

  it('verlangt, dass der letzte Tag nicht vor dem ersten liegt', async () => {
    const wrapper = await send({ member: 'M-117', from: '2026-11-21', to: '2026-11-18' })
    expect(wrapper.find('#to-error').text()).toBe('Der letzte Tag liegt vor dem ersten.')
  })

  it('erlaubt höchstens sieben Tage', async () => {
    const wrapper = await send({ member: 'M-117', from: '2026-11-18', to: '2026-11-28' })
    expect(wrapper.find('#to-error').text()).toBe('Eine Ausleihe dauert höchstens sieben Tage.')
  })

  it('verbindet die Meldung mit ihrem Feld', async () => {
    const field = (await send({ member: 'X', from: '2026-11-18', to: '2026-11-21' })).find('#member')
    expect(field.attributes('aria-invalid')).toBe('true')
    expect(field.attributes('aria-describedby')).toBe('member-error')
  })

  it('erfasst eine gültige Anfrage ohne Meldungen', async () => {
    const wrapper = await send({ member: 'M-204', from: '2026-11-21', to: '2026-11-28' })
    expect(wrapper.findAll('.error')).toHaveLength(0)
    expect(wrapper.find('.summary').text()).toContain('M-204')
  })
})
