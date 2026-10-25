import { enableAutoUnmount, flushPromises } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { signOut } from '../src/auth.js'
import { cardNames, cardOf, visit } from './visit.js'

enableAutoUnmount(afterEach)

afterEach(() => {
  vi.unstubAllGlobals()
  vi.useRealTimers()
  signOut()
  localStorage.clear()
  document.body.innerHTML = ''
})

describe('Favorites', () => {
  it('marks things as favorites and counts them in the header', async () => {
    const wrapper = await visit('/')
    await cardOf(wrapper, 'Projector').find('button.favorite').trigger('click')
    await cardOf(wrapper, 'Drill').find('button.favorite').trigger('click')
    expect(wrapper.find('.favorites').text()).toBe('2 favorites')
    expect(cardOf(wrapper, 'Projector').find('button.favorite').attributes('aria-pressed')).toBe('true')
    await cardOf(wrapper, 'Projector').find('button.favorite').trigger('click')
    expect(wrapper.find('.favorites').text()).toBe('1 favorite')
  })

  it('shows the favorites on a page of their own', async () => {
    const wrapper = await visit('/')
    await cardOf(wrapper, 'Projector').find('button.favorite').trigger('click')
    await wrapper.find('nav a[href="/favorites"]').trigger('click')
    await flushPromises()
    expect(wrapper.find('h1').text()).toBe('Favorites')
    expect(cardNames(wrapper)).toEqual(['Projector'])
  })

  it('shows a hint with a link to the catalog without favorites', async () => {
    const wrapper = await visit('/favorites')
    expect(wrapper.find('.empty').text().replace(/\s+/g, ' ')).toBe('No favorites yet. In the catalog you mark things with "Favorite".')
    expect(wrapper.find('.empty a').attributes('href')).toBe('/')
  })
})
