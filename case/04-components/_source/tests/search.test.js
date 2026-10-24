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

describe('[%Suche und Filter als Komponenten|Search and filter as components%]', () => {
  it('[%findet Dinge nach einem Teil des Namens|finds things by part of their name%]', async () => {
    expect(names(await filter({ text: '  [%SÄGE|SAW%] ' }))).toEqual(['[%Stichsäge|Jigsaw%]', '[%Kreissäge|Circular saw%]'])
  })

  it('[%filtert nach Kategorie und zählt die Treffer|filters by category and counts the hits%]', async () => {
    const wrapper = await filter({ category: '[%Werkzeug|Tools%]' })
    expect(names(wrapper)).toHaveLength(10)
    expect(wrapper.find('.hits').text()).toBe('[%10 Dinge gefunden|10 things found%]')
  })

  it('[%meldet, wenn nichts passt|reports when nothing matches%]', async () => {
    const wrapper = await filter({ category: '[%Küche|Kitchen%]', text: '[%zelt|tent%]' })
    expect(names(wrapper)).toHaveLength(0)
    expect(wrapper.find('.empty').text()).toBe('[%Keine Dinge gefunden.|No things found.%]')
  })

  it('[%behält die Suche nach dem Besuch der Seite eines Dings|keeps the search after a visit to the page of a thing%]', async () => {
    const wrapper = await filter({ text: '[%säge|saw%]' })
    let changed = nextHashChange()
    await wrapper.find('button.reserve').trigger('click')
    await changed
    changed = nextHashChange()
    location.hash = '#/'
    await changed
    await flushPromises()
    expect(names(wrapper)).toHaveLength(2)
    expect(wrapper.findComponent(SearchBar).find('input').element.value).toBe('[%säge|saw%]')
  })
})
