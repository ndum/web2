import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import items from '../data/items.json'
import App from '../src/App.vue'

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

describe('[%Eine Seite für jedes Ding|A page for every thing%]', () => {
  it('[%öffnet die Seite eines Dings direkt über ihre Adresse|opens the page of a thing directly from its address%]', async () => {
    location.hash = '#/items/6'
    const wrapper = await start()
    expect(wrapper.find('h1').text()).toBe('[%Beamer|Projector%]')
    expect(wrapper.text().replace(/\s+/g, ' ')).toContain('CHF 80.00')
  })

  it('[%wechselt beim Klick auf ein Ding zu seiner Seite und zurück|switches to the page of a thing on a click and back%]', async () => {
    const wrapper = await start()
    let changed = nextHashChange()
    wrapper.find('a[href="#/items/2"]').element.click()
    await changed
    await flushPromises()
    expect(wrapper.find('h1').text()).toBe('[%Zelt für vier Personen|Tent for four%]')
    expect(wrapper.find('.state').text()).toBe('[%Wieder verfügbar ab 12.11.2026|Available again from 11/12/2026%]')
    changed = nextHashChange()
    wrapper.find('main a[href="#/"]').element.click()
    await changed
    await flushPromises()
    expect(wrapper.findAll('.catalog li')).toHaveLength(60)
  })

  it('[%meldet unbekannte Adressen und Dinge|reports unknown addresses and things%]', async () => {
    location.hash = '#/items/999'
    const wrapper = await start()
    expect(wrapper.text()).toContain('[%Dieses Ding gibt es nicht.|This thing does not exist.%]')
    const changed = nextHashChange()
    location.hash = '#/members'
    await changed
    await flushPromises()
    expect(wrapper.text()).toContain('[%Diese Seite gibt es nicht.|This page does not exist.%]')
  })
})
