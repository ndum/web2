import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import items from '../data/items.json'
import App from '../src/App.vue'

beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn(async () => new Response(JSON.stringify(items))))
})

afterEach(() => {
  vi.unstubAllGlobals()
})

async function filter({ category = '', text = '' }) {
  const wrapper = mount(App)
  await flushPromises()
  await wrapper.find('select#category').setValue(category)
  await wrapper.find('#search').setValue(text)
  return wrapper
}

const names = (wrapper) => wrapper.findAll('.catalog li .name').map((name) => name.text())

describe('Suche und Filter', () => {
  it('findet Dinge nach einem Teil des Namens', async () => {
    expect(names(await filter({ text: '  SÄGE ' }))).toEqual(['Stichsäge', 'Kreissäge'])
  })

  it('bietet die Kategorien in alphabetischer Reihenfolge an', async () => {
    const wrapper = await filter({})
    const options = wrapper.findAll('select#category option').map((option) => option.text())
    expect(options.slice(1)).toEqual(['Camping', 'Feste', 'Garten', 'Kinder', 'Küche', 'Werkzeug'])
  })

  it('filtert nach Kategorie und zählt die Treffer', async () => {
    const wrapper = await filter({ category: 'Werkzeug' })
    expect(names(wrapper)).toHaveLength(10)
    expect(wrapper.find('.hits').text()).toBe('10 Dinge gefunden')
  })

  it('meldet, wenn nichts passt', async () => {
    const wrapper = await filter({ category: 'Küche', text: 'zelt' })
    expect(names(wrapper)).toHaveLength(0)
    expect(wrapper.text()).toContain('Keine Dinge gefunden.')
  })
})
