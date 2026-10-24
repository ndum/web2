import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import App from '../src/App.vue'
import appSource from '../src/App.vue?raw'

const modules = import.meta.glob('../src/components/PageLayout.vue')

// The file does not exist before the exercise, so the test loads it only when it is there
async function load(modules, path) {
  const loader = modules[path]
  expect(loader, `[%Lege die Datei|Create the file%] ${path.replace('../', '')} [%an|%]`.trim()).toBeDefined()
  return (await loader()).default
}

describe('[%Einstieg, ein Rahmen für die Seite|Getting started, a frame for the page%]', () => {
  it('[%zeigt die Slots in Kopf, Hauptteil und Fuss|shows the slots in header, main part and footer%]', async () => {
    const PageLayout = await load(modules, '../src/components/PageLayout.vue')
    const page = mount(PageLayout, {
      slots: { header: '[%Kopf|Header%]', default: '<p>[%Inhalt|Content%]</p>', footer: '[%Fuss|Footer%]' },
    })
    expect(page.find('header').text()).toBe('[%Kopf|Header%]')
    expect(page.find('main').text()).toBe('[%Inhalt|Content%]')
    expect(page.find('footer').text()).toBe('[%Fuss|Footer%]')
  })

  it('[%zeigt ohne Slot für den Kopf den Namen des Vereins|shows the name of the association without a header slot%]', async () => {
    const PageLayout = await load(modules, '../src/components/PageLayout.vue')
    expect(mount(PageLayout, { slots: { default: '[%Inhalt|Content%]' } }).find('header').text()).toBe('Lorraine Commons')
  })

  it('[%rahmt die Seite in App ein|frames the page in App%]', async () => {
    const PageLayout = await load(modules, '../src/components/PageLayout.vue')
    expect(mount(App).findComponent(PageLayout).exists()).toBe(true)
    expect(appSource).not.toMatch(/<header/)
  })
})
