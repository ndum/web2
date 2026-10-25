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

// The router answers back and forward a little later, after the popstate event of the browser
const nextNavigation = () =>
  new Promise((resolve) => {
    const remove = router.afterEach(() => {
      remove()
      resolve()
    })
  })

describe('Suche, Kategorie und Sortierung in der Adresse', () => {
  it('filtert nach Suchtext und Kategorie aus der Adresse', async () => {
    const wrapper = await visit('/?q=säge&category=Werkzeug')
    expect(cardNames(wrapper)).toEqual(['Kreissäge', 'Stichsäge'])
    expect(wrapper.find('#search').element.value).toBe('säge')
    expect(wrapper.find('#category').element.value).toBe('Werkzeug')
    expect(wrapper.find('.hits').text()).toBe('2 Dinge gefunden')
  })

  it('schreibt den Suchtext nach einer Pause in die Adresse', async () => {
    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] })
    const wrapper = await visit('/')
    await wrapper.find('#search').setValue('zelt')
    vi.advanceTimersByTime(299)
    await flushPromises()
    expect(router.currentRoute.value.query.q).toBeUndefined()
    expect(cardNames(wrapper)).toHaveLength(60)
    vi.advanceTimersByTime(1)
    await flushPromises()
    expect(router.currentRoute.value.query.q).toBe('zelt')
    expect(cardNames(wrapper)).toHaveLength(3)
  })

  it('schreibt Kategorie und Sortierung sofort in die Adresse', async () => {
    const wrapper = await visit('/?q=zelt')
    await wrapper.find('#category').setValue('Camping')
    // Each change waits for the navigation of the one before, as a person would
    await flushPromises()
    await wrapper.find('#sort').setValue('deposit')
    await flushPromises()
    expect(router.currentRoute.value.query).toEqual({ q: 'zelt', category: 'Camping', sort: 'deposit' })
    expect(cardNames(wrapper)).toEqual(['Zelt für zwei Personen', 'Zelt für vier Personen'])
  })

  it('sortiert nach Verfügbarkeit, was da ist, zuerst', async () => {
    const wrapper = await visit('/?category=Camping')
    expect(wrapper.find('#sort').element.value).toBe('name')
    await wrapper.find('#sort').setValue('availability')
    await flushPromises()
    expect(router.currentRoute.value.query.sort).toBe('availability')
    const states = wrapper.findAll('.card .state').map((state) => state.text())
    const firstOnLoan = states.indexOf('Ausgeliehen')
    expect(firstOnLoan).toBeGreaterThan(0)
    expect(states.slice(firstOnLoan).every((state) => state === 'Ausgeliehen')).toBe(true)
  })

  it('meldet, wenn nichts passt', async () => {
    const wrapper = await visit('/?q=zelt&category=Küche')
    expect(wrapper.find('.empty').text()).toBe('Keine Dinge gefunden.')
  })

  it('stellt die Suche mit dem Zurück-Knopf wieder her', async () => {
    const wrapper = await visit('/?q=säge')
    await cardOf(wrapper, 'Stichsäge').find('a.reserve').trigger('click')
    await flushPromises()
    expect(router.currentRoute.value.name).toBe('item')
    const back = nextNavigation()
    router.back()
    await back
    await flushPromises()
    expect(router.currentRoute.value.query.q).toBe('säge')
    expect(cardNames(wrapper)).toHaveLength(2)
    expect(wrapper.find('#search').element.value).toBe('säge')
  })
})
