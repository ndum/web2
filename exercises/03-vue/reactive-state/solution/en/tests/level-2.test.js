import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import App from '../src/App.vue'

const names = (wrapper) => wrapper.findAll('.catalog li .name').map((name) => name.text())

async function search(text) {
  const wrapper = mount(App)
  const field = wrapper.find('#search')
  expect(field.exists(), 'Add a search field with the id search').toBe(true)
  await field.setValue(text)
  return wrapper
}

describe('Going further, the search', () => {
  it('shows only the things whose name contains the search text', async () => {
    expect(names(await search('saw'))).toEqual(['Jigsaw', 'Circular saw'])
  })

  it('ignores case and spaces', async () => {
    expect(names(await search('  TENT '))).toHaveLength(3)
  })

  it('shows the whole catalog with an empty search', async () => {
    expect(names(await search(''))).toHaveLength(60)
  })
})
