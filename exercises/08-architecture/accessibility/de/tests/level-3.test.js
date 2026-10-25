import { enableAutoUnmount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'

import { entryOf, showApp } from './helpers.js'

enableAutoUnmount(afterEach)
afterEach(() => {
  document.body.innerHTML = ''
})

const removeButtons = (wrapper) => wrapper.findAll('.favorites .remove')

describe('Knobelei, der Fokus nach dem Entfernen', () => {
  it('setzt den Fokus auf den Eintrag, der nachrückt', async () => {
    const wrapper = showApp([1, 6, 2])
    await removeButtons(wrapper)[0].trigger('click')
    expect(document.activeElement).toBe(removeButtons(wrapper)[0].element)
    expect(entryOf(wrapper, '.favorites li', 'Beamer').find('.remove').element).toBe(document.activeElement)
  })

  it('setzt den Fokus am Ende der Liste auf den Eintrag davor', async () => {
    const wrapper = showApp([1, 6])
    await removeButtons(wrapper)[1].trigger('click')
    expect(document.activeElement).toBe(removeButtons(wrapper)[0].element)
  })

  it('setzt den Fokus auf die Überschrift, wenn die Liste leer ist', async () => {
    const wrapper = showApp([6])
    await removeButtons(wrapper)[0].trigger('click')
    const heading = wrapper.findAll('h2').find((entry) => entry.text() === 'Favoriten')
    expect(document.activeElement).toBe(heading.element)
  })
})
