// @vitest-environment happy-dom
import { describe, expect, it } from 'vitest'

import { renderList } from '../app/render.js'
import items from '../data/items.json'

// Puts the HTML into the page, so the test can look at the elements
function show(html) {
  document.body.innerHTML = html
  return document.body
}

describe('Einstieg, der Katalog als Liste', () => {
  it('zeigt eine Liste mit der Klasse catalog und einem Eintrag pro Ding', () => {
    expect(show(renderList(items)).querySelectorAll('ul.catalog > li')).toHaveLength(60)
  })

  it('verlinkt jeden Eintrag mit der Seite seines Dings', () => {
    const link = show(renderList(items)).querySelector('li a')
    expect(link.getAttribute('href')).toBe('#/items/1')
    expect(link.textContent).toBe('Bohrmaschine')
  })

  it('sagt, ob ein Ding da ist', () => {
    const entries = show(renderList(items.slice(0, 2))).querySelectorAll('li')
    expect(entries[0].textContent).toContain('Verfügbar')
    expect(entries[1].textContent).toContain('Ausgeliehen')
  })

  it('zeigt Namen als Text, auch mit spitzen Klammern', () => {
    const page = show(renderList([{ id: 99, name: '<b>Zelt</b>', category: 'Camping', deposit: 50, availableFrom: null }]))
    expect(page.querySelector('b')).toBeNull()
    expect(page.querySelector('li a').textContent).toBe('<b>Zelt</b>')
  })
})
