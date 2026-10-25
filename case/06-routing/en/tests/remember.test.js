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

describe('What the app keeps', () => {
  it('keeps the favorites across a restart', async () => {
    const first = await visit('/')
    await cardOf(first, 'Projector').find('button.favorite').trigger('click')
    first.unmount()
    expect(JSON.parse(localStorage.getItem('lorraine-commons-favorites'))).toEqual([6])
    const second = await visit('/favorites')
    expect(cardNames(second)).toEqual(['Projector'])
    second.unmount()
  })

  it('starts without favorites for a damaged entry', async () => {
    localStorage.setItem('lorraine-commons-favorites', '[1,')
    expect((await visit('/')).find('.favorites').text()).toBe('0 favorites')
  })

  it('keeps the filter in the address, not in the storage of the browser', async () => {
    const wrapper = await visit('/?q=saw&sort=deposit')
    expect(cardNames(wrapper)).toEqual(['Jigsaw', 'Circular saw'])
    expect(localStorage.getItem('lorraine-commons-search')).toBeNull()
  })
})
