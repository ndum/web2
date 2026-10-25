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

describe('Knobelei, Öffnungstage und Meldungen beim Verlassen eines Felds', () => {
  it('zeigt eine Meldung, sobald jemand das Feld verlässt', async () => {
    const wrapper = mount(App)
    await wrapper.find('#member').trigger('blur')
    expect(wrapper.find('#member-error').exists()).toBe(true)
    expect(wrapper.find('#from-error').exists()).toBe(false)
  })

  it('verlangt einen Öffnungstag für die Abholung', async () => {
    // 19 November 2026 is a Thursday
    const wrapper = await send({ member: 'M-117', from: '2026-11-19', to: '2026-11-21' })
    expect(wrapper.find('#from-error').text()).toBe('Abholen kannst du am Mittwoch oder am Samstag.')
  })

  it('verlangt einen Öffnungstag für die Rückgabe', async () => {
    // 23 November 2026 is a Monday
    const wrapper = await send({ member: 'M-117', from: '2026-11-21', to: '2026-11-23' })
    expect(wrapper.find('#to-error').text()).toBe('Zurückbringen kannst du am Mittwoch oder am Samstag.')
  })

  it('erfasst eine Ausleihe von Samstag bis Samstag', async () => {
    const wrapper = await send({ member: 'M-117', from: '2026-11-21', to: '2026-11-28' })
    expect(wrapper.findAll('.error')).toHaveLength(0)
    expect(wrapper.find('.summary').text()).not.toBe('')
  })
})
