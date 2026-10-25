import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import App from '../src/App.vue'
import appSource from '../src/App.vue?raw'

const footers = import.meta.glob('../src/components/AppFooter.vue')
const hours = import.meta.glob('../src/components/OpeningHours.vue')

// The file does not exist before the exercise, so the test loads it only when it is there
async function load(modules, path) {
  const loader = modules[path]
  expect(loader, `Lege die Datei ${path.replace('../', '')} an`.trim()).toBeDefined()
  return (await loader()).default
}

describe('Vertiefung, der Fuss mit den Öffnungszeiten', () => {
  it('zeigt beide Öffnungszeiten in einer eigenen Komponente', async () => {
    const OpeningHours = await load(hours, '../src/components/OpeningHours.vue')
    const text = mount(OpeningHours).text()
    expect(text).toContain('Mittwoch 17 bis 19 Uhr')
    expect(text).toContain('Samstag 10 bis 13 Uhr')
  })

  it('setzt die Öffnungszeiten in den Fuss', async () => {
    const AppFooter = await load(footers, '../src/components/AppFooter.vue')
    const OpeningHours = await load(hours, '../src/components/OpeningHours.vue')
    const footer = mount(AppFooter)
    expect(footer.find('footer').exists()).toBe(true)
    expect(footer.findComponent(OpeningHours).exists()).toBe(true)
  })

  it('steht in App.vue als Komponente statt als HTML', async () => {
    const AppFooter = await load(footers, '../src/components/AppFooter.vue')
    expect(mount(App).findComponent(AppFooter).exists()).toBe(true)
    expect(appSource).not.toMatch(/<footer/)
  })
})
