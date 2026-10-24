// @vitest-environment happy-dom
import { describe, expect, it } from 'vitest'

import { renderList } from '../app/render.js'
import items from '../data/items.json'

// Puts the HTML into the page, so the test can look at the elements
function show(html) {
  document.body.innerHTML = html
  return document.body
}

describe('[%Einstieg, der Katalog als Liste|Getting started, the catalog as a list%]', () => {
  it('[%zeigt eine Liste mit der Klasse catalog und einem Eintrag pro Ding|shows a list with the class catalog and an entry per thing%]', () => {
    expect(show(renderList(items)).querySelectorAll('ul.catalog > li')).toHaveLength(60)
  })

  it('[%verlinkt jeden Eintrag mit der Seite seines Dings|links every entry to the page of its thing%]', () => {
    const link = show(renderList(items)).querySelector('li a')
    expect(link.getAttribute('href')).toBe('#/items/1')
    expect(link.textContent).toBe('[%Bohrmaschine|Drill%]')
  })

  it('[%sagt, ob ein Ding da ist|says whether a thing is in%]', () => {
    const entries = show(renderList(items.slice(0, 2))).querySelectorAll('li')
    expect(entries[0].textContent).toContain('[%Verfügbar|Available%]')
    expect(entries[1].textContent).toContain('[%Ausgeliehen|On loan%]')
  })

  it('[%zeigt Namen als Text, auch mit spitzen Klammern|shows names as text, angle brackets included%]', () => {
    const page = show(renderList([{ id: 99, name: '<b>[%Zelt|Tent%]</b>', category: 'Camping', deposit: 50, availableFrom: null }]))
    expect(page.querySelector('b')).toBeNull()
    expect(page.querySelector('li a').textContent).toBe('<b>[%Zelt|Tent%]</b>')
  })
})
