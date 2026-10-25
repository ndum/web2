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

describe('[%Favoriten|Favorites%]', () => {
  it('[%markiert Dinge als Favoriten und zählt sie im Kopf|marks things as favorites and counts them in the header%]', async () => {
    const wrapper = await visit('/')
    await cardOf(wrapper, '[%Beamer|Projector%]').find('button.favorite').trigger('click')
    await cardOf(wrapper, '[%Bohrmaschine|Drill%]').find('button.favorite').trigger('click')
    expect(wrapper.find('.favorites').text()).toBe('[%2 Favoriten|2 favorites%]')
    expect(cardOf(wrapper, '[%Beamer|Projector%]').find('button.favorite').attributes('aria-pressed')).toBe('true')
    await cardOf(wrapper, '[%Beamer|Projector%]').find('button.favorite').trigger('click')
    expect(wrapper.find('.favorites').text()).toBe('[%1 Favorit|1 favorite%]')
  })

  it('[%zeigt die Favoriten auf einer eigenen Seite|shows the favorites on a page of their own%]', async () => {
    const wrapper = await visit('/')
    await cardOf(wrapper, '[%Beamer|Projector%]').find('button.favorite').trigger('click')
    await wrapper.find('nav a[href="/favorites"]').trigger('click')
    await flushPromises()
    expect(wrapper.find('h1').text()).toBe('[%Favoriten|Favorites%]')
    expect(cardNames(wrapper)).toEqual(['[%Beamer|Projector%]'])
  })

  it('[%zeigt ohne Favoriten einen Hinweis mit einem Link zum Katalog|shows a hint with a link to the catalog without favorites%]', async () => {
    const wrapper = await visit('/favorites')
    expect(wrapper.find('.empty').text().replace(/\s+/g, ' ')).toBe('[%Noch keine Favoriten. Im Katalog markierst du Dinge mit «Favorit».|No favorites yet. In the catalog you mark things with "Favorite".%]')
    expect(wrapper.find('.empty a').attributes('href')).toBe('/')
  })
})
