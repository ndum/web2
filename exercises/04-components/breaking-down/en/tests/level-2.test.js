import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import App from '../src/App.vue'
import appSource from '../src/App.vue?raw'

const footers = import.meta.glob('../src/components/AppFooter.vue')
const hours = import.meta.glob('../src/components/OpeningHours.vue')

// The file does not exist before the exercise, so the test loads it only when it is there
async function load(modules, path) {
  const loader = modules[path]
  expect(loader, `Create the file ${path.replace('../', '')} `.trim()).toBeDefined()
  return (await loader()).default
}

describe('Going further, the footer with the opening hours', () => {
  it('shows both opening hours in a component of their own', async () => {
    const OpeningHours = await load(hours, '../src/components/OpeningHours.vue')
    const text = mount(OpeningHours).text()
    expect(text).toContain('Wednesday 5 to 7 p.m.')
    expect(text).toContain('Saturday 10 a.m. to 1 p.m.')
  })

  it('puts the opening hours into the footer', async () => {
    const AppFooter = await load(footers, '../src/components/AppFooter.vue')
    const OpeningHours = await load(hours, '../src/components/OpeningHours.vue')
    const footer = mount(AppFooter)
    expect(footer.find('footer').exists()).toBe(true)
    expect(footer.findComponent(OpeningHours).exists()).toBe(true)
  })

  it('appears in App.vue as a component instead of HTML', async () => {
    const AppFooter = await load(footers, '../src/components/AppFooter.vue')
    expect(mount(App).findComponent(AppFooter).exists()).toBe(true)
    expect(appSource).not.toMatch(/<footer/)
  })
})
