import { enableAutoUnmount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'

import { accessibleName, entryOf, showApp } from './helpers.js'

enableAutoUnmount(afterEach)
afterEach(() => {
  document.body.innerHTML = ''
})

describe('[%Einstieg, Namen und Rollen|Getting started, names and roles%]', () => {
  it('[%beschriftet jedes Feld mit einem label|labels every field with a label%]', () => {
    const wrapper = showApp()
    const fields = wrapper.findAll('input, select, textarea')
    expect(fields.length).toBe(4)
    for (const field of fields) {
      const id = field.attributes('id')
      expect(id).toBeTruthy()
      expect(wrapper.find(`label[for="${id}"]`).exists()).toBe(true)
    }
  })

  it('[%macht «Favorit» zu einem Knopf, der seinen Zustand meldet|turns "Favorite" into a button that reports its state%]', async () => {
    const wrapper = showApp()
    const favorite = wrapper.find('.favorite')
    expect(favorite.element.tagName).toBe('BUTTON')
    expect(favorite.attributes('aria-pressed')).toBe('false')
    await favorite.trigger('click')
    expect(wrapper.find('.favorite').attributes('aria-pressed')).toBe('true')
  })

  it('[%nennt bei «Favorit» und «Entfernen» das Ding|names the thing in "Favorite" and "Remove"%]', () => {
    const wrapper = showApp([6])
    const favorite = entryOf(wrapper, '.catalog li', '[%Beamer|Projector%]').find('.favorite')
    const remove = entryOf(wrapper, '.favorites li', '[%Beamer|Projector%]').find('.remove')
    expect(accessibleName(favorite.element)).toContain('[%Beamer|Projector%]')
    expect(accessibleName(remove.element)).toContain('[%Beamer|Projector%]')
  })
})
