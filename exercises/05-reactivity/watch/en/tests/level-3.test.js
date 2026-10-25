import { flushPromises, mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import App from '../src/App.vue'
import { checkAvailability } from '../src/availability.js'

// The test answers in place of the stand-in and decides the order of the answers
vi.mock('../src/availability.js', () => ({ checkAvailability: vi.fn() }))

let answers

beforeEach(() => {
  localStorage.clear()
  answers = new Map()
  checkAvailability.mockReset()
  checkAvailability.mockImplementation((id) => new Promise((resolve) => answers.set(id, resolve)))
})

describe('Challenge, only the last answer counts', () => {
  it('shows the answer for the chosen thing', async () => {
    const wrapper = mount(App)
    await wrapper.find('#item').setValue('2')
    answers.get(2)({ id: 2, available: false })
    await flushPromises()
    expect(wrapper.find('.availability').text()).toBe('Tent for four is on loan right now')
  })

  it('drops an answer that arrives too late', async () => {
    const wrapper = mount(App)
    await wrapper.find('#item').setValue('2')
    await wrapper.find('#item').setValue('1')
    answers.get(1)({ id: 1, available: true })
    await flushPromises()
    answers.get(2)({ id: 2, available: false })
    await flushPromises()
    expect(wrapper.find('.availability').text()).toBe('Drill is in right now')
  })
})
