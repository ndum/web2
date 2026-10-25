import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import ItemCard from '../src/components/ItemCard.vue'

// The file does not exist before the exercise, so the test loads it only when it is there
const modules = import.meta.glob('../src/components/ItemList.vue')

async function loadItemList() {
  const load = modules['../src/components/ItemList.vue']
  expect(load, 'Lege die Datei src/components/ItemList.vue an').toBeDefined()
  return (await load()).default
}

const items = [
  { id: 1, name: 'Leiter', category: 'Werkzeug', deposit: 20, availableFrom: null },
  { id: 2, name: 'Velo-Anhänger', category: 'Kinder', deposit: 60, availableFrom: '2026-11-12' },
]

describe('Knobelei, eine Liste als Komponente', () => {
  it('zeigt für jedes Ding eine Karte', async () => {
    const ItemList = await loadItemList()
    const wrapper = mount(ItemList, { props: { items } })
    expect(wrapper.findAllComponents(ItemCard)).toHaveLength(2)
  })

  it('gibt alle Angaben an die Karten weiter', async () => {
    const ItemList = await loadItemList()
    const card = mount(ItemList, { props: { items } }).findAllComponents(ItemCard)[1]
    expect(card.props()).toMatchObject({ name: 'Velo-Anhänger', category: 'Kinder', deposit: 60, availableFrom: '2026-11-12' })
  })

  it('zeigt eine Meldung, wenn die Liste leer ist', async () => {
    const ItemList = await loadItemList()
    const wrapper = mount(ItemList, { props: { items: [] } })
    expect(wrapper.text()).toContain('Keine Dinge gefunden.')
    expect(wrapper.findAllComponents(ItemCard)).toHaveLength(0)
  })
})