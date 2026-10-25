import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h } from 'vue'

import App from '../src/App.vue'

const modules = import.meta.glob('../src/components/ItemList.vue')

// The file does not exist before the exercise, so the test loads it only when it is there
async function load(modules, path) {
  const loader = modules[path]
  expect(loader, `Create the file ${path.replace('../', '')} `.trim()).toBeDefined()
  return (await loader()).default
}

const items = [
  { id: 7, name: 'Ladder', deposit: 20 },
  { id: 9, name: 'Bike trailer', deposit: 60 },
]

describe('Challenge, a list with a scoped slot', () => {
  it('shows the names without a slot', async () => {
    const ItemList = await load(modules, '../src/components/ItemList.vue')
    const entries = mount(ItemList, { props: { items } }).findAll('li')
    expect(entries.map((entry) => entry.text())).toEqual(['Ladder', 'Bike trailer'])
  })

  it('lets the parent shape every entry', async () => {
    const ItemList = await load(modules, '../src/components/ItemList.vue')
    const list = mount(ItemList, { props: { items }, slots: { item: ({ item }) => h('strong', `${item.name} ${item.deposit}`) } })
    expect(list.findAll('li strong').map((entry) => entry.text())).toEqual(['Ladder 20', 'Bike trailer 60'])
  })

  it('shows the deposit of every thing in App', async () => {
    const ItemList = await load(modules, '../src/components/ItemList.vue')
    const wrapper = mount(App)
    expect(wrapper.findComponent(ItemList).exists()).toBe(true)
    expect(wrapper.text().replace(/\s/g, ' ')).toContain('CHF 20.00')
  })
})
