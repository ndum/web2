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
// The router reacts to hashchange, which the browser fires after the current code
const nextHashChange = () => new Promise((resolve) => addEventListener('hashchange', resolve, { once: true }))

describe('Eine Seite für jedes Ding', () => {
  it('öffnet die Seite eines Dings direkt über ihre Adresse', async () => {
    location.hash = '#/items/6'
    await start(app())
    expect(app().querySelector('h1').textContent).toBe('Beamer')
    expect(app().textContent.replace(/\s+/g, ' ')).toContain('CHF 80.00')
  })

  it('wechselt beim Klick auf ein Ding zu seiner Seite und zurück', async () => {
    await start(app())
    let changed = nextHashChange()
    app().querySelector('a[href="#/items/2"]').click()
    await changed
    expect(app().querySelector('h1').textContent).toBe('Zelt für vier Personen')
    expect(app().textContent).toContain('12.11.2026')
    changed = nextHashChange()
    app().querySelector('a[href="#/"]').click()
    await changed
    expect(app().querySelectorAll('.catalog li')).toHaveLength(60)
  })

  it('meldet unbekannte Adressen und Dinge', async () => {
    location.hash = '#/items/999'
    await start(app())
    expect(app().textContent).toContain('Dieses Ding gibt es nicht.')
    const changed = nextHashChange()
    location.hash = '#/members'
    await changed
    expect(app().textContent).toContain('Diese Seite gibt es nicht.')
  })
})
