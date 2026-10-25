import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import items from '../data/items.json'
import App from '../src/App.vue'
import ItemCard from '../src/components/ItemCard.vue'

beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn(async () => new Response(JSON.stringify(items))))
})

afterEach(() => {
  vi.unstubAllGlobals()
  location.hash = ''
})

// The app reacts to hashchange, which the browser fires after the current code
const nextHashChange = () => new Promise((resolve) => addEventListener('hashchange', resolve, { once: true }))

async function start() {
  const wrapper = mount(App)
  await flushPromises()
  return wrapper
}

describe('[%Der Katalog aus Komponenten|The catalog made of components%]', () => {
  it('[%zeigt jedes Ding als Karte mit Kategorie und Verfügbarkeit|shows every thing as a card with category and availability%]', async () => {
    const cards = (await start()).findAllComponents(ItemCard)
    expect(cards).toHaveLength(60)
    expect(cards[1].props()).toMatchObject({ name: '[%Zelt für vier Personen|Tent for four%]', available: false })
    expect(cards[1].text()).toContain('[%Ausgeliehen|On loan%]')
  })

  it('[%zeigt, wie viele Dinge da sind|shows how many things are in%]', async () => {
    expect((await start()).find('.summary').text()).toBe('[%49 von 60 Dingen sind da|49 of 60 things are in%]')
  })

  it('[%öffnet mit dem Knopf auf der Karte die Seite des Dings|opens the page of the thing with the button on its card%]', async () => {
    const wrapper = await start()
    const changed = nextHashChange()
    await wrapper.findAll('button.reserve')[5].trigger('click')
    await changed
    await flushPromises()
    expect(wrapper.find('h1').text()).toBe('[%Beamer|Projector%]')
  })
})
