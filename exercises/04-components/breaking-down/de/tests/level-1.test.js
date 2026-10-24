import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import App from '../src/App.vue'
import appSource from '../src/App.vue?raw'

const modules = import.meta.glob('../src/components/AppHeader.vue')

// The file does not exist before the exercise, so the test loads it only when it is there
async function load(modules, path) {
  const loader = modules[path]
  expect(loader, `Lege die Datei ${path.replace('../', '')} an`.trim()).toBeDefined()
  return (await loader()).default
}

describe('Einstieg, der Kopf als Komponente', () => {
  it('zeigt den Namen des Vereins als Link zum Katalog', async () => {
    const AppHeader = await load(modules, '../src/components/AppHeader.vue')
    const link = mount(AppHeader).find('header a')
    expect(link.attributes('href')).toBe('#/')
    expect(link.text()).toBe('Lorraine Commons')
  })

  it('steht in App.vue als Komponente statt als HTML', async () => {
    const AppHeader = await load(modules, '../src/components/AppHeader.vue')
    expect(mount(App).findComponent(AppHeader).exists()).toBe(true)
    expect(appSource).not.toMatch(/<header/)
  })
})
