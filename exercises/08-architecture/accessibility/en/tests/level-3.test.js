import { enableAutoUnmount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'

import { entryOf, showApp } from './helpers.js'

enableAutoUnmount(afterEach)
afterEach(() => {
  document.body.innerHTML = ''
})

const removeButtons = (wrapper) => wrapper.findAll('.favorites .remove')

describe('Challenge, the focus after removing', () => {
  it('moves the focus to the entry that takes its place', async () => {
    const wrapper = showApp([1, 6, 2])
    await removeButtons(wrapper)[0].trigger('click')
    expect(document.activeElement).toBe(removeButtons(wrapper)[0].element)
    expect(entryOf(wrapper, '.favorites li', 'Projector').find('.remove').element).toBe(document.activeElement)
  })

  it('moves the focus to the entry before at the end of the list', async () => {
    const wrapper = showApp([1, 6])
    await removeButtons(wrapper)[1].trigger('click')
    expect(document.activeElement).toBe(removeButtons(wrapper)[0].element)
  })

  it('moves the focus to the heading when the list is empty', async () => {
    const wrapper = showApp([6])
    await removeButtons(wrapper)[0].trigger('click')
    const heading = wrapper.findAll('h2').find((entry) => entry.text() === 'Favorites')
    expect(document.activeElement).toBe(heading.element)
  })
})
