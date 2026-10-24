import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'

const hours = import.meta.glob('../src/components/OpeningHours.vue')

// The file does not exist before the exercise, so the test loads it only when it is there
async function load(modules, path) {
  const loader = modules[path]
  expect(loader, `Create the file ${path.replace('../', '')} `.trim()).toBeDefined()
  return (await loader()).default
}

afterEach(() => {
  vi.useRealTimers()
})

// From Monday, 2 November, to Sunday, 8 November 2026
const days = [
  ['2026-11-02', 'Closed today, next opening on Wednesday'],
  ['2026-11-04', 'Open today, 5 to 7 p.m.'],
  ['2026-11-05', 'Closed today, next opening on Saturday'],
  ['2026-11-07', 'Open today, 10 a.m. to 1 p.m.'],
  ['2026-11-08', 'Closed today, next opening on Wednesday'],
]

describe('Challenge, open or closed today', () => {
  for (const [date, notice] of days) {
    it(`shows the right notice on ${date}`, async () => {
      vi.useFakeTimers({ toFake: ['Date'] })
      vi.setSystemTime(new Date(`${date}T09:00:00Z`))
      const OpeningHours = await load(hours, '../src/components/OpeningHours.vue')
      const today = mount(OpeningHours).find('.today')
      expect(today.exists(), 'Add an element with the class today').toBe(true)
      expect(today.text()).toBe(notice)
    })
  }
})
