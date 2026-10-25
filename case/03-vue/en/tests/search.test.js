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

describe('Search and filter', () => {
  it('finds things by part of their name', async () => {
    expect(names(await filter({ text: '  SAW ' }))).toEqual(['Jigsaw', 'Circular saw'])
  })

  it('offers the categories in alphabetical order', async () => {
    const wrapper = await filter({})
    const options = wrapper.findAll('select#category option').map((option) => option.text())
    expect(options.slice(1)).toEqual(['Camping', 'Garden', 'Kids', 'Kitchen', 'Parties', 'Tools'])
  })

  it('filters by category and counts the hits', async () => {
    const wrapper = await filter({ category: 'Tools' })
    expect(names(wrapper)).toHaveLength(10)
    expect(wrapper.find('.hits').text()).toBe('10 things found')
  })

  it('reports when nothing matches', async () => {
    const wrapper = await filter({ category: 'Kitchen', text: 'tent' })
    expect(names(wrapper)).toHaveLength(0)
    expect(wrapper.text()).toContain('No things found.')
  })
})
