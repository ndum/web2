import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import items from '../data/items.json'
import App from '../src/App.vue'
import appSource from '../src/App.vue?raw'

describe('Einstieg, die Liste der Dinge', () => {
  it('zeigt jedes Ding als Eintrag der Liste', () => {
    expect(mount(App).findAll('.catalog li')).toHaveLength(items.length)
  })

  it('zeigt Name und Kategorie jedes Dings', () => {
    const entry = mount(App).findAll('.catalog li')[0]
    expect(entry.find('.name').text()).toBe(items[0].name)
    expect(entry.find('.category').text()).toBe(items[0].category)
  })

  it('gibt jedem Eintrag die id als key', () => {
    expect(appSource).toMatch(/(:|v-bind:)key="item\.id"/)
  })
})
