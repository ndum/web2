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

describe('Der Katalog in Vue', () => {
  it('zeigt alle Dinge mit Kategorie und Verfügbarkeit', async () => {
    const entries = (await start()).findAll('.catalog li')
    expect(entries).toHaveLength(60)
    expect(entries[1].find('.name').text()).toBe('Zelt für vier Personen')
    expect(entries[1].find('.category').text()).toBe('Camping')
    expect(entries[1].find('.state').text()).toBe('Ausgeliehen')
  })

  it('hebt ausgeliehene Dinge hervor', async () => {
    expect((await start()).findAll('.catalog li.on-loan')).toHaveLength(11)
  })

  it('zeigt, wie viele Dinge da sind', async () => {
    expect((await start()).find('.summary').text()).toBe('49 von 60 Dingen sind da')
  })

  it('verlinkt jedes Ding mit seiner Seite', async () => {
    expect((await start()).find('a[href="#/items/6"]').text()).toBe('Beamer')
  })
})
