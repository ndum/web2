import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import items from '../data/items.json'
import App from '../src/App.vue'
import appSource from '../src/App.vue?raw'

describe('Getting started, the list of things', () => {
  it('shows every thing as an entry of the list', () => {
    expect(mount(App).findAll('.catalog li')).toHaveLength(items.length)
  })

  it('shows the name and category of every thing', () => {
    const entry = mount(App).findAll('.catalog li')[0]
    expect(entry.find('.name').text()).toBe(items[0].name)
    expect(entry.find('.category').text()).toBe(items[0].category)
  })

  it('gives every entry the id as its key', () => {
    expect(appSource).toMatch(/(:|v-bind:)key="item\.id"/)
  })
})
