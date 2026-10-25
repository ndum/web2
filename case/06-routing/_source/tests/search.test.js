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

// The router answers back and forward a little later, after the popstate event of the browser
const nextNavigation = () =>
  new Promise((resolve) => {
    const remove = router.afterEach(() => {
      remove()
      resolve()
    })
  })

describe('[%Suche, Kategorie und Sortierung in der Adresse|Search, category and sort order in the address%]', () => {
  it('[%filtert nach Suchtext und Kategorie aus der Adresse|filters by search text and category from the address%]', async () => {
    const wrapper = await visit('/?q=[%säge|saw%]&category=[%Werkzeug|Tools%]')
    expect(cardNames(wrapper)).toEqual(['[%Kreissäge|Circular saw%]', '[%Stichsäge|Jigsaw%]'])
    expect(wrapper.find('#search').element.value).toBe('[%säge|saw%]')
    expect(wrapper.find('#category').element.value).toBe('[%Werkzeug|Tools%]')
    expect(wrapper.find('.hits').text()).toBe('[%2 Dinge gefunden|2 things found%]')
  })

  it('[%schreibt den Suchtext nach einer Pause in die Adresse|writes the search text into the address after a pause%]', async () => {
    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] })
    const wrapper = await visit('/')
    await wrapper.find('#search').setValue('[%zelt|tent%]')
    vi.advanceTimersByTime(299)
    await flushPromises()
    expect(router.currentRoute.value.query.q).toBeUndefined()
    expect(cardNames(wrapper)).toHaveLength(60)
    vi.advanceTimersByTime(1)
    await flushPromises()
    expect(router.currentRoute.value.query.q).toBe('[%zelt|tent%]')
    expect(cardNames(wrapper)).toHaveLength(3)
  })

  it('[%schreibt Kategorie und Sortierung sofort in die Adresse|writes category and sort order into the address at once%]', async () => {
    const wrapper = await visit('/?q=[%zelt|tent%]')
    await wrapper.find('#category').setValue('[%Camping|Camping%]')
    // Each change waits for the navigation of the one before, as a person would
    await flushPromises()
    await wrapper.find('#sort').setValue('deposit')
    await flushPromises()
    expect(router.currentRoute.value.query).toEqual({ q: '[%zelt|tent%]', category: '[%Camping|Camping%]', sort: 'deposit' })
    expect(cardNames(wrapper)).toEqual(['[%Zelt für zwei Personen|Tent for two%]', '[%Zelt für vier Personen|Tent for four%]'])
  })

  it('[%meldet, wenn nichts passt|reports when nothing matches%]', async () => {
    const wrapper = await visit('/?q=[%zelt|tent%]&category=[%Küche|Kitchen%]')
    expect(wrapper.find('.empty').text()).toBe('[%Keine Dinge gefunden.|No things found.%]')
  })

  it('[%stellt die Suche mit dem Zurück-Knopf wieder her|restores the search with the back button%]', async () => {
    const wrapper = await visit('/?q=[%säge|saw%]')
    await cardOf(wrapper, '[%Stichsäge|Jigsaw%]').find('a.reserve').trigger('click')
    await flushPromises()
    expect(router.currentRoute.value.name).toBe('item')
    const back = nextNavigation()
    router.back()
    await back
    await flushPromises()
    expect(router.currentRoute.value.query.q).toBe('[%säge|saw%]')
    expect(cardNames(wrapper)).toHaveLength(2)
    expect(wrapper.find('#search').element.value).toBe('[%säge|saw%]')
  })
})
