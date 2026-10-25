import { enableAutoUnmount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'

import { showApp } from './helpers.js'

enableAutoUnmount(afterEach)
afterEach(() => {
  document.body.innerHTML = ''
})

describe('Vertiefung, Meldungen ohne Fokus', () => {
  it('meldet die Zahl der Treffer in einer Live-Region', async () => {
    const wrapper = showApp()
    const hits = wrapper.find('.hits')
    expect(hits.attributes('role')).toBe('status')
    await wrapper.find('#search').setValue('säge')
    expect(wrapper.find('.hits').text()).toBe('2 Dinge gefunden')
  })

  it('verbindet eine Meldung mit ihrem Feld', async () => {
    const wrapper = showApp()
    await wrapper.find('form').trigger('submit')
    const from = wrapper.find('#from')
    expect(from.attributes('aria-invalid')).toBe('true')
    const message = wrapper.find(`#${from.attributes('aria-describedby')}`)
    expect(message.text()).toBe('Wähl den ersten Tag.')
  })

  it('löst die Verbindung, sobald das Feld stimmt', async () => {
    const wrapper = showApp()
    await wrapper.find('form').trigger('submit')
    await wrapper.find('#from').setValue('2026-11-18')
    expect(wrapper.find('#from').attributes('aria-invalid')).toBe('false')
    expect(wrapper.find('#from').attributes('aria-describedby')).toBeUndefined()
  })
})
