import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import items from '../data/items.json'
import App from '../src/App.vue'
import CategoryFilter from '../src/components/CategoryFilter.vue'
import ItemCard from '../src/components/ItemCard.vue'
import SearchBar from '../src/components/SearchBar.vue'

beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn(async () => new Response(JSON.stringify(items))))
})

afterEach(() => {
  vi.unstubAllGlobals()
  location.hash = ''
})

const nextHashChange = () => new Promise((resolve) => addEventListener('hashchange', resolve, { once: true }))

async function filter({ category = '', text = '' }) {
  const wrapper = mount(App)
  await flushPromises()
  await wrapper.findComponent(CategoryFilter).find('select').setValue(category)
  await wrapper.findComponent(SearchBar).find('input').setValue(text)
  return wrapper
}

const names = (wrapper) => wrapper.findAllComponents(ItemCard).map((card) => card.props('name'))

describe('Suche und Filter als Komponenten', () => {
  it('findet Dinge nach einem Teil des Namens', async () => {
    expect(names(await filter({ text: '  SÄGE ' }))).toEqual(['Stichsäge', 'Kreissäge'])
  })

  it('filtert nach Kategorie und zählt die Treffer', async () => {
    const wrapper = await filter({ category: 'Werkzeug' })
    expect(names(wrapper)).toHaveLength(10)
    expect(wrapper.find('.hits').text()).toBe('10 Dinge gefunden')
  })

  it('meldet, wenn nichts passt', async () => {
    const wrapper = await filter({ category: 'Küche', text: 'zelt' })
    expect(names(wrapper)).toHaveLength(0)
    expect(wrapper.find('.empty').text()).toBe('Keine Dinge gefunden.')
  })

  it('behält die Suche nach dem Besuch der Seite eines Dings', async () => {
    const wrapper = await filter({ text: 'säge' })
    let changed = nextHashChange()
    await wrapper.find('button.reserve').trigger('click')
    await changed
    changed = nextHashChange()
    location.hash = '#/'
    await changed
    await flushPromises()
    expect(names(wrapper)).toHaveLength(2)
    expect(wrapper.findComponent(SearchBar).find('input').element.value).toBe('säge')
  })
})
