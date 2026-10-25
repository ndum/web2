import { enableAutoUnmount, flushPromises } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'

import router from '../src/router/index.js'
import { cardNames, cardOf, visit } from './visit.js'

enableAutoUnmount(afterEach)

afterEach(() => {
  vi.unstubAllGlobals()
  vi.useRealTimers()
  localStorage.clear()
  sessionStorage.clear()
  document.body.innerHTML = ''
})

describe('Der Katalog', () => {
  it('zeigt jedes Ding als Karte mit Kategorie und Verfügbarkeit', async () => {
    const wrapper = await visit('/')
    expect(cardNames(wrapper)).toHaveLength(60)
    const tent = cardOf(wrapper, 'Zelt für vier Personen')
    expect(tent.find('.category').text()).toBe('Camping')
    expect(tent.find('.state').text()).toBe('Ausgeliehen')
  })

  it('zeigt, wie viele Dinge da sind', async () => {
    expect((await visit('/')).find('.summary').text()).toBe('49 von 60 Dingen sind da')
  })

  it('führt mit dem Link «Reservieren» auf die Seite des Dings', async () => {
    const wrapper = await visit('/')
    const link = cardOf(wrapper, 'Beamer').find('a.reserve')
    expect(link.attributes('href')).toBe('/items/6')
    await link.trigger('click')
    await flushPromises()
    expect(router.currentRoute.value.name).toBe('item')
    expect(wrapper.find('h1').text()).toBe('Beamer')
  })
})
