import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'

import OpeningHours from '../src/components/OpeningHours.vue'

afterEach(() => {
  vi.useRealTimers()
})

describe('Öffnungszeiten im Fuss', () => {
  it('sagt am Mittwoch, dass heute offen ist', () => {
    vi.useFakeTimers({ toFake: ['Date'] })
    vi.setSystemTime(new Date('2026-11-04T09:00:00Z'))
    expect(mount(OpeningHours).find('.today').text()).toBe('Heute offen, 17 bis 19 Uhr')
  })

  it('nennt an einem Sonntag den nächsten Öffnungstag', () => {
    vi.useFakeTimers({ toFake: ['Date'] })
    vi.setSystemTime(new Date('2026-11-08T09:00:00Z'))
    expect(mount(OpeningHours).find('.today').text()).toBe('Heute geschlossen, nächste Öffnung am Mittwoch')
  })
})
