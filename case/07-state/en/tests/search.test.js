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

describe('Search, category and sort order in the address', () => {
  it('filters by search text and category from the address', async () => {
    const wrapper = await visit('/?q=saw&category=Tools')
    expect(cardNames(wrapper)).toEqual(['Circular saw', 'Jigsaw'])
    expect(wrapper.find('#search').element.value).toBe('saw')
    expect(wrapper.find('#category').element.value).toBe('Tools')
    expect(wrapper.find('.hits').text()).toBe('2 things found')
  })

  it('writes the search text into the address after a pause', async () => {
    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] })
    const wrapper = await visit('/')
    await wrapper.find('#search').setValue('tent')
    vi.advanceTimersByTime(299)
    await flushPromises()
    expect(router.currentRoute.value.query.q).toBeUndefined()
    expect(cardNames(wrapper)).toHaveLength(60)
    vi.advanceTimersByTime(1)
    await flushPromises()
    expect(router.currentRoute.value.query.q).toBe('tent')
    expect(cardNames(wrapper)).toHaveLength(3)
  })

  it('writes category and sort order into the address at once', async () => {
    const wrapper = await visit('/?q=tent')
    await wrapper.find('#category').setValue('Camping')
    // Each change waits for the navigation of the one before, as a person would
    await flushPromises()
    await wrapper.find('#sort').setValue('deposit')
    await flushPromises()
    expect(router.currentRoute.value.query).toEqual({ q: 'tent', category: 'Camping', sort: 'deposit' })
    expect(cardNames(wrapper)).toEqual(['Tent for two', 'Tent for four'])
  })

  it('reports when nothing matches', async () => {
    const wrapper = await visit('/?q=tent&category=Kitchen')
    expect(wrapper.find('.empty').text()).toBe('No things found.')
  })

  it('restores the search with the back button', async () => {
    const wrapper = await visit('/?q=saw')
    await cardOf(wrapper, 'Jigsaw').find('a.reserve').trigger('click')
    await flushPromises()
    expect(router.currentRoute.value.name).toBe('item')
    const back = nextNavigation()
    router.back()
    await back
    await flushPromises()
    expect(router.currentRoute.value.query.q).toBe('saw')
    expect(cardNames(wrapper)).toHaveLength(2)
    expect(wrapper.find('#search').element.value).toBe('saw')
  })
})
