import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'

import OpeningHours from '../src/components/OpeningHours.vue'

afterEach(() => {
  vi.useRealTimers()
})

describe('[%Öffnungszeiten im Fuss|Opening hours in the footer%]', () => {
  it('[%sagt am Mittwoch, dass heute offen ist|says on Wednesday that the shop is open today%]', () => {
    vi.useFakeTimers({ toFake: ['Date'] })
    vi.setSystemTime(new Date('2026-11-04T09:00:00Z'))
    expect(mount(OpeningHours).find('.today').text()).toBe('[%Heute offen, 17 bis 19 Uhr|Open today, 5 to 7 p.m.%]')
  })

  it('[%nennt an einem Sonntag den nächsten Öffnungstag|names the next opening day on a Sunday%]', () => {
    vi.useFakeTimers({ toFake: ['Date'] })
    vi.setSystemTime(new Date('2026-11-08T09:00:00Z'))
    expect(mount(OpeningHours).find('.today').text()).toBe('[%Heute geschlossen, nächste Öffnung am Mittwoch|Closed today, next opening on Wednesday%]')
  })
})
