import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import items from '../data/items.json'
import App from '../src/App.vue'

describe('Getting started, the start of the catalog', () => {
  it('shows the name of the association as the main heading', () => {
    expect(mount(App).find('h1').text()).toBe('Lorraine Commons')
  })

  it('shows the number of things from the data', () => {
    expect(mount(App).text()).toContain(`${items.length} things in the catalog`)
  })
})
