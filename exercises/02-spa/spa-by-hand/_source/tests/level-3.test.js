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

describe('[%Knobelei, eine Suche, die den Fokus behält|Challenge, a search that keeps its focus%]', () => {
  it('[%zeigt über dem Katalog ein Suchfeld mit der id search|shows a search field with the id search above the catalog%]', () => {
    expect(document.querySelector('#search'), '[%Gib dem Suchfeld die id search|Give the search field the id search%]').not.toBeNull()
  })

  it('[%zeigt nur Dinge, deren Name den Suchtext enthält|shows only things whose name contains the search text%]', () => {
    type(document.querySelector('#search'), '[%SÄGE|SAW%]')
    const names = [...document.querySelectorAll('.catalog li a')].map((link) => link.textContent)
    expect(names).toEqual([%['Stichsäge', 'Kreissäge']|['Jigsaw', 'Circular saw']%])
  })

  it('[%lässt das Suchfeld beim Tippen stehen, mit Fokus und Text|keeps the search field with its focus and text while typing%]', () => {
    const field = document.querySelector('#search')
    type(field, '[%zelt|tent%]')
    expect(document.querySelector('#search')).toBe(field)
    expect(document.activeElement).toBe(field)
    expect(field.value).toBe('[%zelt|tent%]')
  })
})
