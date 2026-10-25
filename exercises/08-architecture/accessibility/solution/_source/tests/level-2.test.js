import { enableAutoUnmount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'

import { showApp } from './helpers.js'

enableAutoUnmount(afterEach)
afterEach(() => {
  document.body.innerHTML = ''
})

describe('[%Vertiefung, Meldungen ohne Fokus|Going further, messages without focus%]', () => {
  it('[%meldet die Zahl der Treffer in einer Live-Region|announces the number of hits in a live region%]', async () => {
    const wrapper = showApp()
    const hits = wrapper.find('.hits')
    expect(hits.attributes('role')).toBe('status')
    await wrapper.find('#search').setValue('[%säge|saw%]')
    expect(wrapper.find('.hits').text()).toBe('[%2 Dinge gefunden|2 things found%]')
  })

  it('[%verbindet eine Meldung mit ihrem Feld|connects a message with its field%]', async () => {
    const wrapper = showApp()
    await wrapper.find('form').trigger('submit')
    const from = wrapper.find('#from')
    expect(from.attributes('aria-invalid')).toBe('true')
    const message = wrapper.find(`#${from.attributes('aria-describedby')}`)
    expect(message.text()).toBe('[%Wähl den ersten Tag.|Choose the first day.%]')
  })

  it('[%löst die Verbindung, sobald das Feld stimmt|removes the connection as soon as the field is right%]', async () => {
    const wrapper = showApp()
    await wrapper.find('form').trigger('submit')
    await wrapper.find('#from').setValue('2026-11-18')
    expect(wrapper.find('#from').attributes('aria-invalid')).toBe('false')
    expect(wrapper.find('#from').attributes('aria-describedby')).toBeUndefined()
  })
})
