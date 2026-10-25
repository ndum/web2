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

describe('The catalog', () => {
  it('shows every thing as a card with category and availability', async () => {
    const wrapper = await visit('/')
    expect(cardNames(wrapper)).toHaveLength(60)
    const tent = cardOf(wrapper, 'Tent for four')
    expect(tent.find('.category').text()).toBe('Camping')
    expect(tent.find('.state').text()).toBe('On loan')
  })

  it('shows how many things are in', async () => {
    expect((await visit('/')).find('.summary').text()).toBe('49 of 60 things are in')
  })

  it('leads to the page of the thing with the link "Reserve"', async () => {
    const wrapper = await visit('/')
    const link = cardOf(wrapper, 'Projector').find('a.reserve')
    expect(link.attributes('href')).toBe('/items/6')
    await link.trigger('click')
    await flushPromises()
    expect(router.currentRoute.value.name).toBe('item')
    expect(wrapper.find('h1').text()).toBe('Projector')
  })
})
