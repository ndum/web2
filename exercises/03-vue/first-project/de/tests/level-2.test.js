import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import App from '../src/App.vue'
import appSource from '../src/App.vue?raw'

// The file does not exist before the exercise, so the test loads it only when it is there
const modules = import.meta.glob('../src/components/OpeningHours.vue')
const sources = import.meta.glob('../src/components/OpeningHours.vue', { query: '?raw', import: 'default' })

async function loadOpeningHours() {
  const load = modules['../src/components/OpeningHours.vue']
  expect(load, 'Lege die Datei src/components/OpeningHours.vue an').toBeDefined()
  return (await load()).default
}

describe('Vertiefung, die Öffnungszeiten als Komponente', () => {
  it('zeigt beide Öffnungszeiten', async () => {
    const OpeningHours = await loadOpeningHours()
    const text = mount(OpeningHours).text()
    expect(text).toContain('Mittwoch 17 bis 19 Uhr')
    expect(text).toContain('Samstag 10 bis 13 Uhr')
  })

  it('hat einen eigenen Stil mit scoped', async () => {
    await loadOpeningHours()
    const source = await sources['../src/components/OpeningHours.vue']()
    expect(source).toMatch(/<style scoped>/)
  })

  it('wird in App.vue mit dem Alias @ eingebunden', async () => {
    const OpeningHours = await loadOpeningHours()
    expect(appSource).toMatch(/from ['"]@\/components\/OpeningHours\.vue['"]/)
    expect(mount(App).findComponent(OpeningHours).exists()).toBe(true)
  })
})
