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

describe('Getting started, recording the request', () => {
  it('sums up the request after sending', async () => {
    const wrapper = mount(App)
    await wrapper.find('#member').setValue('  M-117 ')
    await wrapper.find('#from').setValue('2026-11-18')
    await wrapper.find('#to').setValue('2026-11-21')
    await wrapper.find('form').trigger('submit')
    const summary = wrapper.find('.summary')
    expect(summary.exists(), 'Add an element with the class summary').toBe(true)
    expect(summary.text()).toBe(
      'Reservation request from M-117 for Drill from 11/18/2026 to 11/21/2026 recorded.',
    )
  })

  it('does not reload the page when sending', () => {
    const wrapper = mount(App)
    const event = new Event('submit', { cancelable: true })
    wrapper.find('form').element.dispatchEvent(event)
    expect(event.defaultPrevented).toBe(true)
  })
})
