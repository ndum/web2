import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import App from '../src/App.vue'
import appSource from '../src/App.vue?raw'

const modules = import.meta.glob('../src/components/PageLayout.vue')

// The file does not exist before the exercise, so the test loads it only when it is there
async function load(modules, path) {
  const loader = modules[path]
  expect(loader, `Create the file ${path.replace('../', '')} `.trim()).toBeDefined()
  return (await loader()).default
}

describe('Getting started, a frame for the page', () => {
  it('shows the slots in header, main part and footer', async () => {
    const PageLayout = await load(modules, '../src/components/PageLayout.vue')
    const page = mount(PageLayout, {
      slots: { header: 'Header', default: '<p>Content</p>', footer: 'Footer' },
    })
    expect(page.find('header').text()).toBe('Header')
    expect(page.find('main').text()).toBe('Content')
    expect(page.find('footer').text()).toBe('Footer')
  })

  it('shows the name of the association without a header slot', async () => {
    const PageLayout = await load(modules, '../src/components/PageLayout.vue')
    expect(mount(PageLayout, { slots: { default: 'Content' } }).find('header').text()).toBe('Lorraine Commons')
  })

  it('frames the page in App', async () => {
    const PageLayout = await load(modules, '../src/components/PageLayout.vue')
    expect(mount(App).findComponent(PageLayout).exists()).toBe(true)
    expect(appSource).not.toMatch(/<header/)
  })
})
