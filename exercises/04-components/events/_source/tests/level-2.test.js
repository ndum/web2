import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import App from '../src/App.vue'
import ItemCard from '../src/components/ItemCard.vue'

const modules = import.meta.glob('../src/components/SearchBar.vue')

// The file does not exist before the exercise, so the test loads it only when it is there
async function load(modules, path) {
  const loader = modules[path]
  expect(loader, `[%Lege die Datei|Create the file%] ${path.replace('../', '')} [%an|%]`.trim()).toBeDefined()
  return (await loader()).default
}

describe('[%Vertiefung, das Suchfeld als Komponente|Going further, the search field as a component%]', () => {
  it('[%meldet jede Eingabe mit update:modelValue|reports every input with update:modelValue%]', async () => {
    const SearchBar = await load(modules, '../src/components/SearchBar.vue')
    const bar = mount(SearchBar, { props: { modelValue: '' } })
    await bar.find('input').setValue('[%säge|saw%]')
    expect(bar.emitted('update:modelValue')).toEqual([['[%säge|saw%]']])
  })

  it('[%zeigt den Wert, den App übergibt|shows the value App passes%]', async () => {
    const SearchBar = await load(modules, '../src/components/SearchBar.vue')
    const bar = mount(SearchBar, { props: { modelValue: '[%zelt|tent%]' } })
    expect(bar.find('input').element.value).toBe('[%zelt|tent%]')
  })

  it('[%filtert den Katalog in App über v-model|filters the catalog in App through v-model%]', async () => {
    const SearchBar = await load(modules, '../src/components/SearchBar.vue')
    const wrapper = mount(App)
    await wrapper.findComponent(SearchBar).find('input').setValue('[%säge|saw%]')
    expect(wrapper.findAllComponents(ItemCard)).toHaveLength(2)
  })
})
