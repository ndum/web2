// @vitest-environment happy-dom
import { describe, expect, it } from 'vitest'

import { renderList } from '../app/render.js'
import items from '../data/items.json'

// Puts the HTML into the page, so the test can look at the elements
function show(html) {
  document.body.innerHTML = html
  return document.body
}

describe('Getting started, the catalog as a list', () => {
  it('shows a list with the class catalog and an entry per thing', () => {
    expect(show(renderList(items)).querySelectorAll('ul.catalog > li')).toHaveLength(60)
  })

  it('links every entry to the page of its thing', () => {
    const link = show(renderList(items)).querySelector('li a')
    expect(link.getAttribute('href')).toBe('#/items/1')
    expect(link.textContent).toBe('Drill')
  })

  it('says whether a thing is in', () => {
    const entries = show(renderList(items.slice(0, 2))).querySelectorAll('li')
    expect(entries[0].textContent).toContain('Available')
    expect(entries[1].textContent).toContain('On loan')
  })

  it('shows names as text, angle brackets included', () => {
    const page = show(renderList([{ id: 99, name: '<b>Tent</b>', category: 'Camping', deposit: 50, availableFrom: null }]))
    expect(page.querySelector('b')).toBeNull()
    expect(page.querySelector('li a').textContent).toBe('<b>Tent</b>')
  })
})
