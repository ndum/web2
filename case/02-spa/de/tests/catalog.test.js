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

describe('Katalog im Browser', () => {
  it('zeigt alle 60 Dinge mit einem Link auf ihre Seite', async () => {
    await start(app())
    const links = app().querySelectorAll('.catalog li a')
    expect(links).toHaveLength(60)
    expect(links[5].getAttribute('href')).toBe('#/items/6')
  })

  it('sagt bei jedem Ding, ob es da ist', async () => {
    await start(app())
    const entries = app().querySelectorAll('.catalog li')
    expect(entries[0].textContent).toContain('Verfügbar')
    expect(entries[1].textContent).toContain('Ausgeliehen')
  })

  it('sucht im Namen, ohne dass das Suchfeld den Fokus verliert', async () => {
    await start(app())
    const field = app().querySelector('#search')
    field.focus()
    field.value = 'säge'
    field.dispatchEvent(new Event('input', { bubbles: true }))
    expect(app().querySelectorAll('.catalog li')).toHaveLength(2)
    expect(document.activeElement).toBe(field)
  })
})
