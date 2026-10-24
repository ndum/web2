import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import items from '../data/items.json'
import App from '../src/App.vue'

beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn(async () => new Response(JSON.stringify(items))))
})

afterEach(() => {
  vi.unstubAllGlobals()
})

async function start() {
  const wrapper = mount(App)
  await flushPromises()
  return wrapper
}

describe('[%Der Katalog in Vue|The catalog in Vue%]', () => {
  it('[%zeigt alle Dinge mit Kategorie und Verfügbarkeit|shows every thing with category and availability%]', async () => {
    const entries = (await start()).findAll('.catalog li')
    expect(entries).toHaveLength(60)
    expect(entries[1].find('.name').text()).toBe('[%Zelt für vier Personen|Tent for four%]')
    expect(entries[1].find('.category').text()).toBe('[%Camping|Camping%]')
    expect(entries[1].find('.state').text()).toBe('[%Ausgeliehen|On loan%]')
  })

  it('[%hebt ausgeliehene Dinge hervor|highlights things on loan%]', async () => {
    expect((await start()).findAll('.catalog li.on-loan')).toHaveLength(11)
  })

  it('[%zeigt, wie viele Dinge da sind|shows how many things are in%]', async () => {
    expect((await start()).find('.summary').text()).toBe('[%49 von 60 Dingen sind da|49 of 60 things are in%]')
  })

  it('[%verlinkt jedes Ding mit seiner Seite|links every thing to its page%]', async () => {
    expect((await start()).find('a[href="#/items/6"]').text()).toBe('[%Beamer|Projector%]')
  })
})
