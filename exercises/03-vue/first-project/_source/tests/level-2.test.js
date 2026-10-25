import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import App from '../src/App.vue'
import appSource from '../src/App.vue?raw'

// The file does not exist before the exercise, so the test loads it only when it is there
const modules = import.meta.glob('../src/components/OpeningHours.vue')
const sources = import.meta.glob('../src/components/OpeningHours.vue', { query: '?raw', import: 'default' })

async function loadOpeningHours() {
  const load = modules['../src/components/OpeningHours.vue']
  expect(load, '[%Lege die Datei src/components/OpeningHours.vue an|Create the file src/components/OpeningHours.vue%]').toBeDefined()
  return (await load()).default
}

describe('[%Vertiefung, die Öffnungszeiten als Komponente|Going further, the opening hours as a component%]', () => {
  it('[%zeigt beide Öffnungszeiten|shows both opening hours%]', async () => {
    const OpeningHours = await loadOpeningHours()
    const text = mount(OpeningHours).text()
    expect(text).toContain('[%Mittwoch 17 bis 19 Uhr|Wednesday 5 to 7 p.m.%]')
    expect(text).toContain('[%Samstag 10 bis 13 Uhr|Saturday 10 a.m. to 1 p.m.%]')
  })

  it('[%hat einen eigenen Stil mit scoped|has a style of its own with scoped%]', async () => {
    await loadOpeningHours()
    const source = await sources['../src/components/OpeningHours.vue']()
    expect(source).toMatch(/<style scoped>/)
  })

  it('[%wird in App.vue mit dem Alias @ eingebunden|is included in App.vue with the alias @%]', async () => {
    const OpeningHours = await loadOpeningHours()
    expect(appSource).toMatch(/from ['"]@\/components\/OpeningHours\.vue['"]/)
    expect(mount(App).findComponent(OpeningHours).exists()).toBe(true)
  })
})
