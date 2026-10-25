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

describe('Was die App behält', () => {
  it('behält die Favoriten über einen Neustart', async () => {
    const first = await visit('/')
    await cardOf(first, 'Beamer').find('button.favorite').trigger('click')
    first.unmount()
    expect(JSON.parse(localStorage.getItem('lorraine-commons-favorites'))).toEqual([6])
    const second = await visit('/favorites')
    expect(cardNames(second)).toEqual(['Beamer'])
    second.unmount()
  })

  it('beginnt bei einem kaputten Eintrag ohne Favoriten', async () => {
    localStorage.setItem('lorraine-commons-favorites', '[1,')
    expect((await visit('/')).find('.favorites').text()).toBe('0 Favoriten')
  })

  it('behält den Filter über die Adresse, nicht im Speicher des Browsers', async () => {
    const wrapper = await visit('/?q=säge&sort=deposit')
    expect(cardNames(wrapper)).toEqual(['Stichsäge', 'Kreissäge'])
    expect(localStorage.getItem('lorraine-commons-search')).toBeNull()
  })
})
