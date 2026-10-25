// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import items from '../data/items.json'
import { start } from '../src/app.js'

beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn(async () => new Response(JSON.stringify(items))))
  document.body.innerHTML = '<main id="app"></main>'
})

afterEach(() => {
  vi.unstubAllGlobals()
  location.hash = ''
  document.body.innerHTML = ''
})

const app = () => document.querySelector('#app')

describe('[%Katalog im Browser|Catalog in the browser%]', () => {
  it('[%zeigt alle 60 Dinge mit einem Link auf ihre Seite|shows all 60 things with a link to their page%]', async () => {
    await start(app())
    const links = app().querySelectorAll('.catalog li a')
    expect(links).toHaveLength(60)
    expect(links[5].getAttribute('href')).toBe('#/items/6')
  })

  it('[%sagt bei jedem Ding, ob es da ist|says for every thing whether it is in%]', async () => {
    await start(app())
    const entries = app().querySelectorAll('.catalog li')
    expect(entries[0].textContent).toContain('[%Verfügbar|Available%]')
    expect(entries[1].textContent).toContain('[%Ausgeliehen|On loan%]')
  })

  it('[%sucht im Namen, ohne dass das Suchfeld den Fokus verliert|searches the name without the search field losing its focus%]', async () => {
    await start(app())
    const field = app().querySelector('#search')
    field.focus()
    field.value = '[%säge|saw%]'
    field.dispatchEvent(new Event('input', { bubbles: true }))
    expect(app().querySelectorAll('.catalog li')).toHaveLength(2)
    expect(document.activeElement).toBe(field)
  })
})
