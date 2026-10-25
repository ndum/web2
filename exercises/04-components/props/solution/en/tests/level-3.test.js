import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import ItemCard from '../src/components/ItemCard.vue'

// The file does not exist before the exercise, so the test loads it only when it is there
const modules = import.meta.glob('../src/components/ItemList.vue')

async function loadItemList() {
  const load = modules['../src/components/ItemList.vue']
  expect(load, 'Create the file src/components/ItemList.vue').toBeDefined()
  return (await load()).default
}

const items = [
  { id: 1, name: 'Ladder', category: 'Tools', deposit: 20, availableFrom: null },
  { id: 2, name: 'Bike trailer', category: 'Kids', deposit: 60, availableFrom: '2026-11-12' },
]

describe('Challenge, a list as a component', () => {
  it('shows a card for every thing', async () => {
    const ItemList = await loadItemList()
    const wrapper = mount(ItemList, { props: { items } })
    expect(wrapper.findAllComponents(ItemCard)).toHaveLength(2)
  })

  it('passes every detail on to the cards', async () => {
    const ItemList = await loadItemList()
    const card = mount(ItemList, { props: { items } }).findAllComponents(ItemCard)[1]
    expect(card.props()).toMatchObject({ name: 'Bike trailer', category: 'Kids', deposit: 60, availableFrom: '2026-11-12' })
  })

  it('shows a message when the list is empty', async () => {
    const ItemList = await loadItemList()
    const wrapper = mount(ItemList, { props: { items: [] } })
    expect(wrapper.text()).toContain('No things found.')
    expect(wrapper.findAllComponents(ItemCard)).toHaveLength(0)
  })
})