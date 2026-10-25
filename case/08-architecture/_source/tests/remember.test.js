import { enableAutoUnmount, flushPromises } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { cardNames, cardOf, visit } from './visit.js'

enableAutoUnmount(afterEach)

afterEach(() => {
  vi.unstubAllGlobals()
  vi.useRealTimers()
  localStorage.clear()
  sessionStorage.clear()
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

  it('[%folgt den Favoriten aus einem anderen Tab|follows the favorites from another tab%]', async () => {
    const wrapper = await visit('/favorites')
    // The browser fires the event only in the other tabs, the test fires it itself
    localStorage.setItem('lorraine-commons-favorites', '[6, 1]')
    window.dispatchEvent(new StorageEvent('storage', { key: 'lorraine-commons-favorites', newValue: '[6, 1]', storageArea: localStorage }))
    await flushPromises()
    expect(cardNames(wrapper)).toEqual(['[%Beamer|Projector%]', '[%Bohrmaschine|Drill%]'])
    expect(wrapper.find('.favorites').text()).toBe('[%2 Favoriten|2 favorites%]')
  })

  it('[%behält den Filter über die Adresse, nicht im Speicher des Browsers|keeps the filter in the address, not in the storage of the browser%]', async () => {
    const wrapper = await visit('/?q=[%säge|saw%]&sort=deposit')
    expect(cardNames(wrapper)).toEqual(['[%Stichsäge|Jigsaw%]', '[%Kreissäge|Circular saw%]'])
    expect(localStorage.getItem('lorraine-commons-search')).toBeNull()
  })
})
