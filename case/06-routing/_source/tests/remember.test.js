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

describe('[%Was die App behält|What the app keeps%]', () => {
  it('[%behält die Favoriten über einen Neustart|keeps the favorites across a restart%]', async () => {
    const first = await visit('/')
    await cardOf(first, '[%Beamer|Projector%]').find('button.favorite').trigger('click')
    first.unmount()
    expect(JSON.parse(localStorage.getItem('lorraine-commons-favorites'))).toEqual([6])
    const second = await visit('/favorites')
    expect(cardNames(second)).toEqual(['[%Beamer|Projector%]'])
    second.unmount()
  })

  it('[%beginnt bei einem kaputten Eintrag ohne Favoriten|starts without favorites for a damaged entry%]', async () => {
    localStorage.setItem('lorraine-commons-favorites', '[1,')
    expect((await visit('/')).find('.favorites').text()).toBe('[%0 Favoriten|0 favorites%]')
  })

  it('[%behält den Filter über die Adresse, nicht im Speicher des Browsers|keeps the filter in the address, not in the storage of the browser%]', async () => {
    const wrapper = await visit('/?q=[%säge|saw%]&sort=deposit')
    expect(cardNames(wrapper)).toEqual(['[%Stichsäge|Jigsaw%]', '[%Kreissäge|Circular saw%]'])
    expect(localStorage.getItem('lorraine-commons-search')).toBeNull()
  })
})
