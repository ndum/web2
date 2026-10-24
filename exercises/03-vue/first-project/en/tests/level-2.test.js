import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import App from '../src/App.vue'
import appSource from '../src/App.vue?raw'

// The file does not exist before the exercise, so the test loads it only when it is there
const modules = import.meta.glob('../src/components/OpeningHours.vue')
const sources = import.meta.glob('../src/components/OpeningHours.vue', { query: '?raw', import: 'default' })

async function loadOpeningHours() {
  const load = modules['../src/components/OpeningHours.vue']
  expect(load, 'Create the file src/components/OpeningHours.vue').toBeDefined()
  return (await load()).default
}

describe('Going further, the opening hours as a component', () => {
  it('shows both opening hours', async () => {
    const OpeningHours = await loadOpeningHours()
    const text = mount(OpeningHours).text()
    expect(text).toContain('Wednesday 5 to 7 p.m.')
    expect(text).toContain('Saturday 10 a.m. to 1 p.m.')
  })

  it('has a style of its own with scoped', async () => {
    await loadOpeningHours()
    const source = await sources['../src/components/OpeningHours.vue']()
    expect(source).toMatch(/<style scoped>/)
  })

  it('is included in App.vue with the alias @', async () => {
    const OpeningHours = await loadOpeningHours()
    expect(appSource).toMatch(/from ['"]@\/components\/OpeningHours\.vue['"]/)
    expect(mount(App).findComponent(OpeningHours).exists()).toBe(true)
  })
})
