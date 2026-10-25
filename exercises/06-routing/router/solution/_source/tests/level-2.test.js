import { enableAutoUnmount, flushPromises, mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'

import App from '../src/App.vue'
import appSource from '../src/App.vue?raw'

const routers = import.meta.glob('../src/router/index.js', { import: 'default' })

enableAutoUnmount(afterEach)

async function visit(path) {
  const loader = routers['../src/router/index.js']
  expect(loader, '[%Lege die Datei src/router/index.js an|Create the file src/router/index.js%]').toBeDefined()
  const router = await loader()
  await router.push(path)
  const wrapper = mount(App, { global: { plugins: [router] } })
  await flushPromises()
  return wrapper
}

describe('[%Vertiefung, die Navigation|Going further, the navigation%]', () => {
  it('[%verlinkt Katalog, Favoriten und Verein|links the catalog, the favorites and the association%]', async () => {
    const links = (await visit('/')).findAll('nav a')
    expect(links.map((link) => link.attributes('href'))).toEqual(['/', '/favorites', '/association'])
    expect(links.map((link) => link.text())).toEqual(['[%Katalog|Catalog%]', '[%Favoriten|Favorites%]', '[%Verein|Association%]'])
  })

  it('[%wechselt mit einem Klick die Seite|changes the page with a click%]', async () => {
    const wrapper = await visit('/')
    await wrapper.find('nav a[href="/favorites"]').trigger('click')
    await flushPromises()
    expect(wrapper.find('h1').text()).toBe('[%Favoriten|Favorites%]')
  })

  it('[%markiert den Link zur aktuellen Seite und hebt ihn hervor|marks the link to the current page and highlights it%]', async () => {
    const wrapper = await visit('/association')
    expect(wrapper.find('nav a[href="/association"]').attributes('aria-current')).toBe('page')
    expect(wrapper.find('nav a[href="/"]').attributes('aria-current')).toBeUndefined()
    expect(appSource).toMatch(/aria-current|router-link-(exact-)?active/)
  })
})
