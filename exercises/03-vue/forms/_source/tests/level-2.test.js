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

describe('[%Vertiefung, Fehler in den Eingaben|Going further, errors in the input%]', () => {
  it('[%meldet leere Felder beim Senden und erfasst nichts|reports empty fields when sending and records nothing%]', async () => {
    const wrapper = await send()
    expect(wrapper.find('#member-error').exists(), '[%Zeig die Meldung im Element mit der id member-error|Show the message in the element with the id member-error%]').toBe(true)
    expect(wrapper.find('#from-error').text()).toBe('[%Wähl den ersten Tag.|Choose the first day.%]')
    expect(wrapper.find('#to-error').text()).toBe('[%Wähl den letzten Tag.|Choose the last day.%]')
    expect(wrapper.find('.summary').text()).toBe('')
  })

  it('[%prüft die Form der Mitgliedernummer|checks the form of the member number%]', async () => {
    const wrapper = await send({ member: 'M-11', from: '2026-11-18', to: '2026-11-21' })
    expect(wrapper.find('#member-error').text()).toBe('[%Die Mitgliedernummer hat die Form M-117.|The member number looks like M-117.%]')
  })

  it('[%lehnt einen ersten Tag in der Vergangenheit ab|rejects a first day in the past%]', async () => {
    const wrapper = await send({ member: 'M-117', from: '2026-10-31', to: '2026-11-04' })
    expect(wrapper.find('#from-error').text()).toBe('[%Der erste Tag liegt in der Vergangenheit.|The first day is in the past.%]')
  })

  it('[%verlangt, dass der letzte Tag nicht vor dem ersten liegt|requires that the last day is not before the first%]', async () => {
    const wrapper = await send({ member: 'M-117', from: '2026-11-21', to: '2026-11-18' })
    expect(wrapper.find('#to-error').text()).toBe('[%Der letzte Tag liegt vor dem ersten.|The last day is before the first.%]')
  })

  it('[%erlaubt höchstens sieben Tage|allows at most seven days%]', async () => {
    const wrapper = await send({ member: 'M-117', from: '2026-11-18', to: '2026-11-28' })
    expect(wrapper.find('#to-error').text()).toBe('[%Eine Ausleihe dauert höchstens sieben Tage.|A loan lasts at most seven days.%]')
  })

  it('[%verbindet die Meldung mit ihrem Feld|links the message to its field%]', async () => {
    const field = (await send({ member: 'X', from: '2026-11-18', to: '2026-11-21' })).find('#member')
    expect(field.attributes('aria-invalid')).toBe('true')
    expect(field.attributes('aria-describedby')).toBe('member-error')
  })

  it('[%erfasst eine gültige Anfrage ohne Meldungen|records a valid request without messages%]', async () => {
    const wrapper = await send({ member: 'M-204', from: '2026-11-21', to: '2026-11-28' })
    expect(wrapper.findAll('.error')).toHaveLength(0)
    expect(wrapper.find('.summary').text()).toContain('M-204')
  })
})
