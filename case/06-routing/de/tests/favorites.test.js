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

describe('Favoriten', () => {
  it('markiert Dinge als Favoriten und zählt sie im Kopf', async () => {
    const wrapper = await visit('/')
    await cardOf(wrapper, 'Beamer').find('button.favorite').trigger('click')
    await cardOf(wrapper, 'Bohrmaschine').find('button.favorite').trigger('click')
    expect(wrapper.find('.favorites').text()).toBe('2 Favoriten')
    expect(cardOf(wrapper, 'Beamer').find('button.favorite').attributes('aria-pressed')).toBe('true')
    await cardOf(wrapper, 'Beamer').find('button.favorite').trigger('click')
    expect(wrapper.find('.favorites').text()).toBe('1 Favorit')
  })

  it('zeigt die Favoriten auf einer eigenen Seite', async () => {
    const wrapper = await visit('/')
    await cardOf(wrapper, 'Beamer').find('button.favorite').trigger('click')
    await wrapper.find('nav a[href="/favorites"]').trigger('click')
    await flushPromises()
    expect(wrapper.find('h1').text()).toBe('Favoriten')
    expect(cardNames(wrapper)).toEqual(['Beamer'])
  })

  it('zeigt ohne Favoriten einen Hinweis mit einem Link zum Katalog', async () => {
    const wrapper = await visit('/favorites')
    expect(wrapper.find('.empty').text().replace(/\s+/g, ' ')).toBe('Noch keine Favoriten. Im Katalog markierst du Dinge mit «Favorit».')
    expect(wrapper.find('.empty a').attributes('href')).toBe('/')
  })
})
