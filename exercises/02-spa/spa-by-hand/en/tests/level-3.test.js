// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { start } from '../app/app.js'
import items from '../data/items.json'

beforeEach(async () => {
  vi.stubGlobal('fetch', vi.fn(async () => new Response(JSON.stringify(items))))
  document.body.innerHTML = '<main id="app"></main>'
  await start(document.querySelector('#app'))
})

afterEach(() => {
  vi.unstubAllGlobals()
  document.body.innerHTML = ''
})

// Types text into a field the way the browser reports it, with an input event that bubbles
function type(field, text) {
  field.focus()
  field.value = text
  field.dispatchEvent(new Event('input', { bubbles: true }))
}

describe('Challenge, a search that keeps its focus', () => {
  it('shows a search field with the id search above the catalog', () => {
    expect(document.querySelector('#search'), 'Give the search field the id search').not.toBeNull()
  })

  it('shows only things whose name contains the search text', () => {
    type(document.querySelector('#search'), 'SAW')
    const names = [...document.querySelectorAll('.catalog li a')].map((link) => link.textContent)
    expect(names).toEqual(['Jigsaw', 'Circular saw'])
  })

  it('keeps the search field with its focus and text while typing', () => {
    const field = document.querySelector('#search')
    type(field, 'tent')
    expect(document.querySelector('#search')).toBe(field)
    expect(document.activeElement).toBe(field)
    expect(field.value).toBe('tent')
  })
})
