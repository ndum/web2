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

describe('A page for every thing', () => {
  it('opens the page of a thing directly from its address', async () => {
    location.hash = '#/items/6'
    await start(app())
    expect(app().querySelector('h1').textContent).toBe('Projector')
    expect(app().textContent.replace(/\s+/g, ' ')).toContain('CHF 80.00')
  })

  it('switches to the page of a thing on a click and back', async () => {
    await start(app())
    let changed = nextHashChange()
    app().querySelector('a[href="#/items/2"]').click()
    await changed
    expect(app().querySelector('h1').textContent).toBe('Tent for four')
    expect(app().textContent).toContain('11/12/2026')
    changed = nextHashChange()
    app().querySelector('a[href="#/"]').click()
    await changed
    expect(app().querySelectorAll('.catalog li')).toHaveLength(60)
  })

  it('reports unknown addresses and things', async () => {
    location.hash = '#/items/999'
    await start(app())
    expect(app().textContent).toContain('This thing does not exist.')
    const changed = nextHashChange()
    location.hash = '#/members'
    await changed
    expect(app().textContent).toContain('This page does not exist.')
  })
})
