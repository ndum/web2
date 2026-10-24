import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import App from '../src/App.vue'
import ItemCard from '../src/components/ItemCard.vue'

const modules = import.meta.glob('../src/components/SearchBar.vue')

// The file does not exist before the exercise, so the test loads it only when it is there
async function load(modules, path) {
  const loader = modules[path]
  expect(loader, `Create the file ${path.replace('../', '')} `.trim()).toBeDefined()
  return (await loader()).default
}

describe('Going further, the search field as a component', () => {
  it('reports every input with update:modelValue', async () => {
    const SearchBar = await load(modules, '../src/components/SearchBar.vue')
    const bar = mount(SearchBar, { props: { modelValue: '' } })
    await bar.find('input').setValue('saw')
    expect(bar.emitted('update:modelValue')).toEqual([['saw']])
  })

  it('shows the value App passes', async () => {
    const SearchBar = await load(modules, '../src/components/SearchBar.vue')
    const bar = mount(SearchBar, { props: { modelValue: 'tent' } })
    expect(bar.find('input').element.value).toBe('tent')
  })

  it('filters the catalog in App through v-model', async () => {
    const SearchBar = await load(modules, '../src/components/SearchBar.vue')
    const wrapper = mount(App)
    await wrapper.findComponent(SearchBar).find('input').setValue('saw')
    expect(wrapper.findAllComponents(ItemCard)).toHaveLength(2)
  })
})
