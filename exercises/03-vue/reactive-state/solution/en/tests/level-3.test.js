import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import App from '../src/App.vue'

async function filter({ category = '', text = '' }) {
  const wrapper = mount(App)
  const select = wrapper.find('select#category')
  expect(select.exists(), 'Add a select with the id category').toBe(true)
  await select.setValue(category)
  await wrapper.find('#search').setValue(text)
  return wrapper
}

describe('Challenge, the filter by category', () => {
  it('offers every category in alphabetical order', () => {
    const options = mount(App).findAll('select#category option').map((option) => option.text())
    expect(options).toEqual([
      'All categories',
      'Camping',
      'Garden',
      'Kids',
      'Kitchen',
      'Parties',
      'Tools',
    ])
  })

  it('shows only the things of the chosen category and their number', async () => {
    const wrapper = await filter({ category: 'Tools' })
    expect(wrapper.findAll('.catalog li')).toHaveLength(10)
    expect(wrapper.find('.hits').text()).toBe('10 things found')
  })

  it('combines category and search', async () => {
    const wrapper = await filter({ category: 'Tools', text: 'saw' })
    expect(wrapper.findAll('.catalog li')).toHaveLength(2)
  })

  it('uses the singular for one hit', async () => {
    const wrapper = await filter({ text: 'four' })
    expect(wrapper.find('.hits').text()).toBe('1 thing found')
  })

  it('reports when nothing matches', async () => {
    const wrapper = await filter({ category: 'Kitchen', text: 'tent' })
    expect(wrapper.findAll('.catalog li')).toHaveLength(0)
    expect(wrapper.text()).toContain('No things found.')
  })
})
