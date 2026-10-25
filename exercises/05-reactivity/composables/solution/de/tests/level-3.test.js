import { mount } from '@vue/test-utils'
import { reactive, ref } from 'vue'
import { describe, expect, it } from 'vitest'

import App from '../src/App.vue'
import appSource from '../src/App.vue?raw'

const modules = import.meta.glob('../src/composables/useSearch.js')

// The file does not exist before the exercise, so the test loads it only when it is there
async function load(modules, path, name) {
  const loader = modules[path]
  expect(loader, `Lege die Datei ${path.replace('../', '')} an`.trim()).toBeDefined()
  const exported = (await loader())[name]
  expect(exported, `Exportiere die Funktion ${name}`).toBeTypeOf('function')
  return exported
}

const loadComposable = () => load(modules, '../src/composables/useSearch.js', 'useSearch')

const things = [
  { id: 1, name: 'Bohrmaschine' },
  { id: 5, name: 'Stichsäge' },
  { id: 15, name: 'Kreissäge' },
]

describe('Knobelei, useSearch', () => {
  it('filtert mit einem Ref als Suchtext', async () => {
    const useSearch = await loadComposable()
    const query = ref('säge')
    const { visibleItems, hits } = useSearch(things, query)
    expect(visibleItems.value.map((item) => item.id)).toEqual([5, 15])
    expect(hits.value).toBe(2)
    query.value = 'bohr'
    expect(hits.value).toBe(1)
  })

  it('nimmt auch einen Getter oder einen festen Text', async () => {
    const useSearch = await loadComposable()
    const filters = reactive({ query: 'SÄGE' })
    expect(useSearch(things, () => filters.query).hits.value).toBe(2)
    expect(useSearch(things, 'bohr').hits.value).toBe(1)
  })

  it('folgt einer Liste, die sich ändert', async () => {
    const useSearch = await loadComposable()
    const list = ref(things.slice(0, 2))
    const { hits } = useSearch(list, ' säge ')
    expect(hits.value).toBe(1)
    list.value = things
    expect(hits.value).toBe(2)
  })

  it('sucht in App mit useSearch', async () => {
    expect(appSource).toMatch(/useSearch\(/)
    const wrapper = mount(App)
    await wrapper.find('#search').setValue('zelt')
    expect(wrapper.findAll('.catalog li')).toHaveLength(3)
    expect(wrapper.find('.hits').text()).toBe('3 Dinge gefunden')
  })
})
