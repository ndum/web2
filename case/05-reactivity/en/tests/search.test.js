import { flushPromises, mount } from '@vue/test-utils'
import { nextTick } from 'vue'
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
  vi.useRealTimers()
  location.hash = ''
})

const nextHashChange = () => new Promise((resolve) => addEventListener('hashchange', resolve, { once: true }))
// The list follows the search field after a pause of 300 milliseconds
const pause = () => new Promise((resolve) => setTimeout(resolve, 350))

async function filter({ category = '', text = '' }) {
  const wrapper = mount(App)
  await flushPromises()
  await wrapper.findComponent(CategoryFilter).find('select').setValue(category)
  await wrapper.findComponent(SearchBar).find('input').setValue(text)
  await pause()
  return wrapper
}

const names = (wrapper) => wrapper.findAllComponents(ItemCard).map((card) => card.props('name'))

describe('Search and filter', () => {
  it('finds things by part of their name', async () => {
    expect(names(await filter({ text: '  SAW ' }))).toEqual(['Jigsaw', 'Circular saw'])
  })

  it('filters by category and counts the hits', async () => {
    const wrapper = await filter({ category: 'Tools' })
    expect(names(wrapper)).toHaveLength(10)
    expect(wrapper.find('.hits').text()).toBe('10 things found')
  })

  it('reports when nothing matches', async () => {
    const wrapper = await filter({ category: 'Kitchen', text: 'tent' })
    expect(names(wrapper)).toHaveLength(0)
    expect(wrapper.find('.empty').text()).toBe('No things found.')
  })

  it('keeps the search after a visit to the page of a thing', async () => {
    const wrapper = await filter({ text: 'saw' })
    let changed = nextHashChange()
    await wrapper.find('button.reserve').trigger('click')
    await changed
    changed = nextHashChange()
    location.hash = '#/'
    await changed
    await flushPromises()
    expect(names(wrapper)).toHaveLength(2)
    expect(wrapper.findComponent(SearchBar).find('input').element.value).toBe('saw')
  })

  it('waits with the list until typing pauses', async () => {
    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] })
    const wrapper = mount(App)
    await flushPromises()
    const input = wrapper.findComponent(SearchBar).find('input')
    await input.setValue('te')
    vi.advanceTimersByTime(200)
    await input.setValue('tent')
    vi.advanceTimersByTime(299)
    await nextTick()
    expect(names(wrapper)).toHaveLength(60)
    vi.advanceTimersByTime(1)
    await nextTick()
    expect(names(wrapper)).toHaveLength(3)
  })
})
