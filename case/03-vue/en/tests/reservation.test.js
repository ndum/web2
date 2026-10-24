import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import items from '../data/items.json'
import App from '../src/App.vue'
import { validateRequest } from '../src/reservation.js'

const drill = items[0]
const tent = items[1]
// Monday, 2 November 2026
const monday = '2026-11-02'

describe('Rules of the reservation request', () => {
  const check = (request, item = drill) => validateRequest({ member: 'M-117', from: '', to: '', ...request }, item, monday)

  it('accepts a request from Wednesday to Saturday', () => {
    expect(check({ from: '2026-11-18', to: '2026-11-21' })).toEqual({})
  })

  it('checks the member number', () => {
    expect(check({ member: 'M-1170', from: '2026-11-18', to: '2026-11-21' })).toHaveProperty('member')
  })

  it('rejects days in the past and before the thing is back', () => {
    expect(check({ from: '2026-10-31', to: '2026-11-04' })).toHaveProperty('from')
    expect(check({ from: '2026-11-11', to: '2026-11-14' }, tent).from).toBe('The thing is back only from 11/12/2026.')
    expect(check({ from: '2026-11-14', to: '2026-11-18' }, tent)).toEqual({})
  })

  it('requires opening days and at most seven days', () => {
    expect(check({ from: '2026-11-19', to: '2026-11-21' })).toHaveProperty('from')
    expect(check({ from: '2026-11-18', to: '2026-11-23' })).toHaveProperty('to')
    expect(check({ from: '2026-11-18', to: '2026-11-28' }).to).toBe('A loan lasts at most seven days.')
    expect(check({ from: '2026-11-21', to: '2026-11-18' }).to).toBe('The last day is before the first.')
  })
})

describe('The form on the page of a thing', () => {
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

  it('records a valid request and clears the form', async () => {
    const wrapper = await send({ member: ' M-204 ', from: '2026-11-21', to: '2026-11-25', note: 'For a street party' })
    expect(wrapper.find('.request-summary').text()).toBe(
      'Reservation request from M-204 for Projector from 11/21/2026 to 11/25/2026 recorded. Note: For a street party',
    )
    expect(wrapper.find('#member').element.value).toBe('')
  })

  it('shows messages only after leaving a field or sending', async () => {
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
