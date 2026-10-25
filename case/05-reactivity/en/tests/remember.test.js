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

describe('The app remembers search, category and favorites', () => {
  it('restores the last state after a restart', async () => {
    const first = await start()
    await first.findComponent(SearchBar).find('input').setValue('saw')
    await first.findComponent(CategoryFilter).find('select').setValue('Tools')
    await first.findAll('button.favorite')[0].trigger('click')
    first.unmount()

    const second = await start()
    expect(second.findComponent(SearchBar).find('input').element.value).toBe('saw')
    expect(second.findComponent(CategoryFilter).find('select').element.value).toBe('Tools')
    expect(second.findAllComponents(ItemCard)).toHaveLength(2)
    expect(second.find('.favorites').text()).toBe('1 favorite')
    second.unmount()
  })

  it('stores the values as JSON under keys of their own', async () => {
    const wrapper = await start()
    await wrapper.findAll('button.favorite')[1].trigger('click')
    await wrapper.findComponent(SearchBar).find('input').setValue('tent')
    await wrapper.findComponent(CategoryFilter).find('select').setValue('Camping')
    expect(JSON.parse(localStorage.getItem('lorraine-commons-search'))).toBe('tent')
    expect(JSON.parse(localStorage.getItem('lorraine-commons-category'))).toBe('Camping')
    expect(JSON.parse(localStorage.getItem('lorraine-commons-favorites'))).toEqual([2])
    wrapper.unmount()
  })

  it('starts without filter and favorites for damaged or foreign entries', async () => {
    localStorage.setItem('lorraine-commons-search', 'tent')
    localStorage.setItem('lorraine-commons-category', '42')
    localStorage.setItem('lorraine-commons-favorites', '[1,')
    const wrapper = await start()
    expect(wrapper.findComponent(SearchBar).find('input').element.value).toBe('')
    expect(wrapper.findAllComponents(ItemCard)).toHaveLength(60)
    expect(wrapper.find('.favorites').text()).toBe('0 favorites')
    wrapper.unmount()
  })
})
