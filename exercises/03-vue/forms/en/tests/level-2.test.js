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

describe('Going further, errors in the input', () => {
  it('reports empty fields when sending and records nothing', async () => {
    const wrapper = await send()
    expect(wrapper.find('#member-error').exists(), 'Show the message in the element with the id member-error').toBe(true)
    expect(wrapper.find('#from-error').text()).toBe('Choose the first day.')
    expect(wrapper.find('#to-error').text()).toBe('Choose the last day.')
    expect(wrapper.find('.summary').text()).toBe('')
  })

  it('checks the form of the member number', async () => {
    const wrapper = await send({ member: 'M-11', from: '2026-11-18', to: '2026-11-21' })
    expect(wrapper.find('#member-error').text()).toBe('The member number looks like M-117.')
  })

  it('rejects a first day in the past', async () => {
    const wrapper = await send({ member: 'M-117', from: '2026-10-31', to: '2026-11-04' })
    expect(wrapper.find('#from-error').text()).toBe('The first day is in the past.')
  })

  it('requires that the last day is not before the first', async () => {
    const wrapper = await send({ member: 'M-117', from: '2026-11-21', to: '2026-11-18' })
    expect(wrapper.find('#to-error').text()).toBe('The last day is before the first.')
  })

  it('allows at most seven days', async () => {
    const wrapper = await send({ member: 'M-117', from: '2026-11-18', to: '2026-11-28' })
    expect(wrapper.find('#to-error').text()).toBe('A loan lasts at most seven days.')
  })

  it('links the message to its field', async () => {
    const field = (await send({ member: 'X', from: '2026-11-18', to: '2026-11-21' })).find('#member')
    expect(field.attributes('aria-invalid')).toBe('true')
    expect(field.attributes('aria-describedby')).toBe('member-error')
  })

  it('records a valid request without messages', async () => {
    const wrapper = await send({ member: 'M-204', from: '2026-11-21', to: '2026-11-28' })
    expect(wrapper.findAll('.error')).toHaveLength(0)
    expect(wrapper.find('.summary').text()).toContain('M-204')
  })
})
