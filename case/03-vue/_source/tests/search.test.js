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

describe('[%Suche und Filter|Search and filter%]', () => {
  it('[%findet Dinge nach einem Teil des Namens|finds things by part of their name%]', async () => {
    expect(names(await filter({ text: '  [%SÄGE|SAW%] ' }))).toEqual(['[%Stichsäge|Jigsaw%]', '[%Kreissäge|Circular saw%]'])
  })

  it('[%bietet die Kategorien in alphabetischer Reihenfolge an|offers the categories in alphabetical order%]', async () => {
    const wrapper = await filter({})
    const options = wrapper.findAll('select#category option').map((option) => option.text())
    expect(options.slice(1)).toEqual(['[%Camping|Camping%]', '[%Feste|Garden%]', '[%Garten|Kids%]', '[%Kinder|Kitchen%]', '[%Küche|Parties%]', '[%Werkzeug|Tools%]'])
  })

  it('[%filtert nach Kategorie und zählt die Treffer|filters by category and counts the hits%]', async () => {
    const wrapper = await filter({ category: '[%Werkzeug|Tools%]' })
    expect(names(wrapper)).toHaveLength(10)
    expect(wrapper.find('.hits').text()).toBe('[%10 Dinge gefunden|10 things found%]')
  })

  it('[%meldet, wenn nichts passt|reports when nothing matches%]', async () => {
    const wrapper = await filter({ category: '[%Küche|Kitchen%]', text: '[%zelt|tent%]' })
    expect(names(wrapper)).toHaveLength(0)
    expect(wrapper.text()).toContain('[%Keine Dinge gefunden.|No things found.%]')
  })
})
