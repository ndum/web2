import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h } from 'vue'

import App from '../src/App.vue'

const modules = import.meta.glob('../src/components/ItemList.vue')

// The file does not exist before the exercise, so the test loads it only when it is there
async function load(modules, path) {
  const loader = modules[path]
  expect(loader, `Lege die Datei ${path.replace('../', '')} an`.trim()).toBeDefined()
  return (await loader()).default
}

const items = [
  { id: 7, name: 'Leiter', deposit: 20 },
  { id: 9, name: 'Velo-Anhänger', deposit: 60 },
]

describe('Knobelei, eine Liste mit Scoped Slot', () => {
  it('zeigt ohne Slot die Namen', async () => {
    const ItemList = await load(modules, '../src/components/ItemList.vue')
    const entries = mount(ItemList, { props: { items } }).findAll('li')
    expect(entries.map((entry) => entry.text())).toEqual(['Leiter', 'Velo-Anhänger'])
  })

  it('lässt die Elternkomponente jeden Eintrag gestalten', async () => {
    const ItemList = await load(modules, '../src/components/ItemList.vue')
    const list = mount(ItemList, { props: { items }, slots: { item: ({ item }) => h('strong', `${item.name} ${item.deposit}`) } })
    expect(list.findAll('li strong').map((entry) => entry.text())).toEqual(['Leiter 20', 'Velo-Anhänger 60'])
  })

  it('zeigt in App das Pfand zu jedem Ding', async () => {
    const ItemList = await load(modules, '../src/components/ItemList.vue')
    const wrapper = mount(App)
    expect(wrapper.findComponent(ItemList).exists()).toBe(true)
    expect(wrapper.text().replace(/\s/g, ' ')).toContain('CHF 20.00')
  })
})
