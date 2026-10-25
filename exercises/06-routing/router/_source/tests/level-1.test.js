import { enableAutoUnmount, flushPromises, mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'

import App from '../src/App.vue'
import mainSource from '../src/main.js?raw'

const routers = import.meta.glob('../src/router/index.js', { import: 'default' })
const sources = import.meta.glob('../src/router/index.js', { query: '?raw', import: 'default' })

enableAutoUnmount(afterEach)

// The file does not exist before the exercise, so the test loads it only when it is there
async function load(modules) {
  const loader = modules['../src/router/index.js']
  expect(loader, '[%Lege die Datei src/router/index.js an|Create the file src/router/index.js%]').toBeDefined()
  return loader()
}

async function visit(path) {
  const router = await load(routers)
  await router.push(path)
  const wrapper = mount(App, { global: { plugins: [router] } })
  await flushPromises()
  return wrapper
}

describe('[%Einstieg, der Router zeigt zwei Seiten|Getting started, the router shows two pages%]', () => {
  it('[%zeigt unter / den Katalog|shows the catalog at /%]', async () => {
    const wrapper = await visit('/')
    expect(wrapper.find('h1').text()).toBe('[%Katalog|Catalog%]')
    expect(wrapper.findAll('.catalog li')).toHaveLength(60)
  })

  it('[%zeigt unter /association den Verein|shows the association at /association%]', async () => {
    expect((await visit('/association')).find('h1').text()).toBe('[%Verein|Association%]')
  })

  it('[%verwendet createWebHistory und meldet den Router in main.js an|uses createWebHistory and installs the router in main.js%]', async () => {
    expect(await load(sources)).toMatch(/createWebHistory\(/)
    expect(mainSource).toMatch(/\.use\(router\)/)
  })
})
