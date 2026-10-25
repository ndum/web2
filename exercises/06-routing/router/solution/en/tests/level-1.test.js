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
  expect(loader, 'Create the file src/router/index.js').toBeDefined()
  return loader()
}

async function visit(path) {
  const router = await load(routers)
  await router.push(path)
  const wrapper = mount(App, { global: { plugins: [router] } })
  await flushPromises()
  return wrapper
}

describe('Getting started, the router shows two pages', () => {
  it('shows the catalog at /', async () => {
    const wrapper = await visit('/')
    expect(wrapper.find('h1').text()).toBe('Catalog')
    expect(wrapper.findAll('.catalog li')).toHaveLength(60)
  })

  it('shows the association at /association', async () => {
    expect((await visit('/association')).find('h1').text()).toBe('Association')
  })

  it('uses createWebHistory and installs the router in main.js', async () => {
    expect(await load(sources)).toMatch(/createWebHistory\(/)
    expect(mainSource).toMatch(/\.use\(router\)/)
  })
})
