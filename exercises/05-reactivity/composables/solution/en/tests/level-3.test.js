import { mount } from '@vue/test-utils'
import { reactive, ref } from 'vue'
import { describe, expect, it } from 'vitest'

import App from '../src/App.vue'
import appSource from '../src/App.vue?raw'

const modules = import.meta.glob('../src/composables/useSearch.js')

// The file does not exist before the exercise, so the test loads it only when it is there
async function load(modules, path, name) {
  const loader = modules[path]
  expect(loader, `Create the file ${path.replace('../', '')} `.trim()).toBeDefined()
  const exported = (await loader())[name]
  expect(exported, `Export the function ${name}`).toBeTypeOf('function')
  return exported
}

const loadComposable = () => load(modules, '../src/composables/useSearch.js', 'useSearch')

const things = [
  { id: 1, name: 'Drill' },
  { id: 5, name: 'Jigsaw' },
  { id: 15, name: 'Circular saw' },
]

describe('Challenge, useSearch', () => {
  it('filters with a ref as the search text', async () => {
    const useSearch = await loadComposable()
    const query = ref('saw')
    const { visibleItems, hits } = useSearch(things, query)
    expect(visibleItems.value.map((item) => item.id)).toEqual([5, 15])
    expect(hits.value).toBe(2)
    query.value = 'drill'
    expect(hits.value).toBe(1)
  })

  it('also takes a getter or a fixed text', async () => {
    const useSearch = await loadComposable()
    const filters = reactive({ query: 'SAW' })
    expect(useSearch(things, () => filters.query).hits.value).toBe(2)
    expect(useSearch(things, 'drill').hits.value).toBe(1)
  })

  it('follows a list that changes', async () => {
    const useSearch = await loadComposable()
    const list = ref(things.slice(0, 2))
    const { hits } = useSearch(list, ' saw ')
    expect(hits.value).toBe(1)
    list.value = things
    expect(hits.value).toBe(2)
  })

  it('searches with useSearch in App', async () => {
    expect(appSource).toMatch(/useSearch\(/)
    const wrapper = mount(App)
    await wrapper.find('#search').setValue('tent')
    expect(wrapper.findAll('.catalog li')).toHaveLength(3)
    expect(wrapper.find('.hits').text()).toBe('3 things found')
  })
})
