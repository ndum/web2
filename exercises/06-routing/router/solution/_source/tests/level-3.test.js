import { enableAutoUnmount, flushPromises, mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'

import App from '../src/App.vue'
import appSource from '../src/App.vue?raw'
import AssociationView from '../src/views/AssociationView.vue'
import associationSource from '../src/views/AssociationView.vue?raw'

const routers = import.meta.glob('../src/router/index.js', { import: 'default' })

enableAutoUnmount(afterEach)

async function loadRouter() {
  const loader = routers['../src/router/index.js']
  expect(loader, '[%Lege die Datei src/router/index.js an|Create the file src/router/index.js%]').toBeDefined()
  return loader()
}

describe('[%Knobelei, benannte Routen|Challenge, named routes%]', () => {
  it('[%gibt jeder Route einen Namen|gives every route a name%]', async () => {
    const router = await loadRouter()
    expect(router.resolve({ name: 'catalog' }).path).toBe('/')
    expect(router.resolve({ name: 'favorites' }).path).toBe('/favorites')
    expect(router.resolve({ name: 'association' }).path).toBe('/association')
  })

  it('[%verlinkt in App.vue nur mit Namen|links with names only in App.vue%]', () => {
    expect(appSource).toMatch(/name: 'favorites'/)
    expect(appSource, '[%App.vue enthält noch einen Link mit einem Pfad|App.vue still has a link with a path%]').not.toMatch(/\sto="\//)
  })

  it('[%führt vom Verein mit dem Namen zurück zum Katalog|leads from the association back to the catalog by name%]', async () => {
    const router = await loadRouter()
    await router.push('/association')
    const wrapper = mount(App, { global: { plugins: [router] } })
    await flushPromises()
    const link = wrapper.findComponent(AssociationView).find('a')
    expect(link.text()).toBe('[%Zum Katalog|Back to the catalog%]')
    expect(link.attributes('href')).toBe('/')
    expect(associationSource).toMatch(/name: 'catalog'/)
  })
})
