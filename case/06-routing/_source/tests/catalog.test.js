import { enableAutoUnmount, flushPromises } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { signOut } from '../src/auth.js'
import router from '../src/router/index.js'
import { cardNames, cardOf, visit } from './visit.js'

enableAutoUnmount(afterEach)

afterEach(() => {
  vi.unstubAllGlobals()
  vi.useRealTimers()
  signOut()
  localStorage.clear()
  document.body.innerHTML = ''
})

describe('[%Der Katalog|The catalog%]', () => {
  it('[%zeigt jedes Ding als Karte mit Kategorie und Verfügbarkeit|shows every thing as a card with category and availability%]', async () => {
    const wrapper = await visit('/')
    expect(cardNames(wrapper)).toHaveLength(60)
    const tent = cardOf(wrapper, '[%Zelt für vier Personen|Tent for four%]')
    expect(tent.find('.category').text()).toBe('[%Camping|Camping%]')
    expect(tent.find('.state').text()).toBe('[%Ausgeliehen|On loan%]')
  })

  it('[%zeigt, wie viele Dinge da sind|shows how many things are in%]', async () => {
    expect((await visit('/')).find('.summary').text()).toBe('[%49 von 60 Dingen sind da|49 of 60 things are in%]')
  })

  it('[%führt mit dem Link «Reservieren» auf die Seite des Dings|leads to the page of the thing with the link "Reserve"%]', async () => {
    const wrapper = await visit('/')
    const link = cardOf(wrapper, '[%Beamer|Projector%]').find('a.reserve')
    expect(link.attributes('href')).toBe('/items/6')
    await link.trigger('click')
    await flushPromises()
    expect(router.currentRoute.value.name).toBe('item')
    expect(wrapper.find('h1').text()).toBe('[%Beamer|Projector%]')
  })
})
