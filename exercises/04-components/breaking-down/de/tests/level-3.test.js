import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'

const hours = import.meta.glob('../src/components/OpeningHours.vue')

// The file does not exist before the exercise, so the test loads it only when it is there
async function load(modules, path) {
  const loader = modules[path]
  expect(loader, `Lege die Datei ${path.replace('../', '')} an`.trim()).toBeDefined()
  return (await loader()).default
}

afterEach(() => {
  vi.useRealTimers()
})

// From Monday, 2 November, to Sunday, 8 November 2026
const days = [
  ['2026-11-02', 'Heute geschlossen, nächste Öffnung am Mittwoch'],
  ['2026-11-04', 'Heute offen, 17 bis 19 Uhr'],
  ['2026-11-05', 'Heute geschlossen, nächste Öffnung am Samstag'],
  ['2026-11-07', 'Heute offen, 10 bis 13 Uhr'],
  ['2026-11-08', 'Heute geschlossen, nächste Öffnung am Mittwoch'],
]

describe('Knobelei, heute offen oder geschlossen', () => {
  for (const [date, notice] of days) {
    it(`zeigt den passenden Hinweis am ${date}`, async () => {
      vi.useFakeTimers({ toFake: ['Date'] })
      vi.setSystemTime(new Date(`${date}T09:00:00Z`))
      const OpeningHours = await load(hours, '../src/components/OpeningHours.vue')
      const today = mount(OpeningHours).find('.today')
      expect(today.exists(), 'Ergänze ein Element mit der Klasse today').toBe(true)
      expect(today.text()).toBe(notice)
    })
  }
})
