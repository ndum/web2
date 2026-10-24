import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import App from '../src/App.vue'
import appSource from '../src/App.vue?raw'

const modules = import.meta.glob('../src/components/PageLayout.vue')

// The file does not exist before the exercise, so the test loads it only when it is there
async function load(modules, path) {
  const loader = modules[path]
  expect(loader, `Lege die Datei ${path.replace('../', '')} an`.trim()).toBeDefined()
  return (await loader()).default
}

describe('Einstieg, ein Rahmen für die Seite', () => {
  it('zeigt die Slots in Kopf, Hauptteil und Fuss', async () => {
    const PageLayout = await load(modules, '../src/components/PageLayout.vue')
    const page = mount(PageLayout, {
      slots: { header: 'Kopf', default: '<p>Inhalt</p>', footer: 'Fuss' },
    })
    expect(page.find('header').text()).toBe('Kopf')
    expect(page.find('main').text()).toBe('Inhalt')
    expect(page.find('footer').text()).toBe('Fuss')
  })

  it('zeigt ohne Slot für den Kopf den Namen des Vereins', async () => {
    const PageLayout = await load(modules, '../src/components/PageLayout.vue')
    expect(mount(PageLayout, { slots: { default: 'Inhalt' } }).find('header').text()).toBe('Lorraine Commons')
  })

  it('rahmt die Seite in App ein', async () => {
    const PageLayout = await load(modules, '../src/components/PageLayout.vue')
    expect(mount(App).findComponent(PageLayout).exists()).toBe(true)
    expect(appSource).not.toMatch(/<header/)
  })
})
