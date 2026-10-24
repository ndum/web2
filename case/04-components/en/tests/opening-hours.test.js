import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'

import OpeningHours from '../src/components/OpeningHours.vue'

afterEach(() => {
  vi.useRealTimers()
})

describe('Opening hours in the footer', () => {
  it('says on Wednesday that the shop is open today', () => {
    vi.useFakeTimers({ toFake: ['Date'] })
    vi.setSystemTime(new Date('2026-11-04T09:00:00Z'))
    expect(mount(OpeningHours).find('.today').text()).toBe('Open today, 5 to 7 p.m.')
  })

  it('names the next opening day on a Sunday', () => {
    vi.useFakeTimers({ toFake: ['Date'] })
    vi.setSystemTime(new Date('2026-11-08T09:00:00Z'))
    expect(mount(OpeningHours).find('.today').text()).toBe('Closed today, next opening on Wednesday')
  })
})
