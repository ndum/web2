import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import items from '../data/items.json'
import App from '../src/App.vue'
import CategoryFilter from '../src/components/CategoryFilter.vue'
import ItemCard from '../src/components/ItemCard.vue'
import SearchBar from '../src/components/SearchBar.vue'

beforeEach(() => {
  localStorage.clear()
  vi.stubGlobal('fetch', vi.fn(async () => new Response(JSON.stringify(items))))
})

afterEach(() => {
  vi.unstubAllGlobals()
})

async function start() {
  const wrapper = mount(App)
  await flushPromises()
  return wrapper
}

describe('Die App merkt sich Suche, Kategorie und Favoriten', () => {
  it('stellt nach einem Neustart den letzten Stand wieder her', async () => {
    const first = await start()
    await first.findComponent(SearchBar).find('input').setValue('säge')
    await first.findComponent(CategoryFilter).find('select').setValue('Werkzeug')
    await first.findAll('button.favorite')[0].trigger('click')
    first.unmount()

    const second = await start()
    expect(second.findComponent(SearchBar).find('input').element.value).toBe('säge')
    expect(second.findComponent(CategoryFilter).find('select').element.value).toBe('Werkzeug')
    expect(second.findAllComponents(ItemCard)).toHaveLength(2)
    expect(second.find('.favorites').text()).toBe('1 Favorit')
    second.unmount()
  })

  it('legt die Werte als JSON unter eigenen Schlüsseln ab', async () => {
    const wrapper = await start()
    await wrapper.findAll('button.favorite')[1].trigger('click')
    await wrapper.findComponent(SearchBar).find('input').setValue('zelt')
    await wrapper.findComponent(CategoryFilter).find('select').setValue('Camping')
    expect(JSON.parse(localStorage.getItem('lorraine-commons-search'))).toBe('zelt')
    expect(JSON.parse(localStorage.getItem('lorraine-commons-category'))).toBe('Camping')
    expect(JSON.parse(localStorage.getItem('lorraine-commons-favorites'))).toEqual([2])
    wrapper.unmount()
  })

  it('beginnt bei kaputten oder fremden Einträgen ohne Filter und Favoriten', async () => {
    localStorage.setItem('lorraine-commons-search', 'zelt')
    localStorage.setItem('lorraine-commons-category', '42')
    localStorage.setItem('lorraine-commons-favorites', '[1,')
    const wrapper = await start()
    expect(wrapper.findComponent(SearchBar).find('input').element.value).toBe('')
    expect(wrapper.findAllComponents(ItemCard)).toHaveLength(60)
    expect(wrapper.find('.favorites').text()).toBe('0 Favoriten')
    wrapper.unmount()
  })
})
