// @vitest-environment happy-dom
import { afterEach, describe, expect, it, vi } from 'vitest'

import { start } from '../app/app.js'
import { renderDetail } from '../app/render.js'
import { parseRoute } from '../app/router.js'
import items from '../data/items.json'

afterEach(() => {
  vi.unstubAllGlobals()
  location.hash = ''
  document.body.innerHTML = ''
})

describe('Going further, a page for every thing', () => {
  it('recognizes the catalog, the page of a thing and unknown addresses', () => {
    expect(parseRoute('')).toEqual({ name: 'catalog' })
    expect(parseRoute('#/')).toEqual({ name: 'catalog' })
    expect(parseRoute('#/items/6')).toEqual({ name: 'item', id: 6 })
    expect(parseRoute('#/items/six')).toEqual({ name: 'notFound' })
    expect(parseRoute('#/members')).toEqual({ name: 'notFound' })
  })

  it('shows name, deposit and a link back to the catalog', () => {
    document.body.innerHTML = renderDetail(items[5])
    expect(document.querySelector('h1').textContent).toBe('Projector')
    // Intl puts a non-breaking space after CHF
    expect(document.body.textContent.replace(/\s+/g, ' ')).toContain('CHF 80.00')
    expect(document.querySelector('a[href="#/"]')).not.toBeNull()
  })

  it('names the date from which a thing on loan is back', () => {
    document.body.innerHTML = renderDetail(items[1])
    expect(document.body.textContent).toContain('11/12/2026')
  })

  it('opens the page of a thing directly from its address', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => new Response(JSON.stringify(items))))
    location.hash = '#/items/6'
    document.body.innerHTML = '<main id="app"></main>'
    await start(document.querySelector('#app'))
    expect(document.querySelector('h1')?.textContent).toBe('Projector')
  })
})
