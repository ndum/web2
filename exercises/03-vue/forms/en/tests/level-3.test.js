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

describe('Challenge, opening days and messages when leaving a field', () => {
  it('shows a message as soon as someone leaves the field', async () => {
    const wrapper = mount(App)
    await wrapper.find('#member').trigger('blur')
    expect(wrapper.find('#member-error').exists()).toBe(true)
    expect(wrapper.find('#from-error').exists()).toBe(false)
  })

  it('requires an opening day for the pickup', async () => {
    // 19 November 2026 is a Thursday
    const wrapper = await send({ member: 'M-117', from: '2026-11-19', to: '2026-11-21' })
    expect(wrapper.find('#from-error').text()).toBe('You can pick things up on Wednesday or Saturday.')
  })

  it('requires an opening day for the return', async () => {
    // 23 November 2026 is a Monday
    const wrapper = await send({ member: 'M-117', from: '2026-11-21', to: '2026-11-23' })
    expect(wrapper.find('#to-error').text()).toBe('You can bring things back on Wednesday or Saturday.')
  })

  it('records a loan from Saturday to Saturday', async () => {
    const wrapper = await send({ member: 'M-117', from: '2026-11-21', to: '2026-11-28' })
    expect(wrapper.findAll('.error')).toHaveLength(0)
    expect(wrapper.find('.summary').text()).not.toBe('')
  })
})
