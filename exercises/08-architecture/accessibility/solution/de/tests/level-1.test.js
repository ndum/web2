import { enableAutoUnmount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'

import { accessibleName, entryOf, showApp } from './helpers.js'

enableAutoUnmount(afterEach)
afterEach(() => {
  document.body.innerHTML = ''
})

describe('Einstieg, Namen und Rollen', () => {
  it('beschriftet jedes Feld mit einem label', () => {
    const wrapper = showApp()
    const fields = wrapper.findAll('input, select, textarea')
    expect(fields.length).toBe(4)
    for (const field of fields) {
      const id = field.attributes('id')
      expect(id).toBeTruthy()
      expect(wrapper.find(`label[for="${id}"]`).exists()).toBe(true)
    }
  })

  it('macht «Favorit» zu einem Knopf, der seinen Zustand meldet', async () => {
    const wrapper = showApp()
    const favorite = wrapper.find('.favorite')
    expect(favorite.element.tagName).toBe('BUTTON')
    expect(favorite.attributes('aria-pressed')).toBe('false')
    await favorite.trigger('click')
    expect(wrapper.find('.favorite').attributes('aria-pressed')).toBe('true')
  })

  it('nennt bei «Favorit» und «Entfernen» das Ding', () => {
    const wrapper = showApp([6])
    const favorite = entryOf(wrapper, '.catalog li', 'Beamer').find('.favorite')
    const remove = entryOf(wrapper, '.favorites li', 'Beamer').find('.remove')
    expect(accessibleName(favorite.element)).toContain('Beamer')
    expect(accessibleName(remove.element)).toContain('Beamer')
  })
})
