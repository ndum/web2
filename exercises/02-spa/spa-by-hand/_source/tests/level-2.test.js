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

describe('[%Vertiefung, eine Seite für jedes Ding|Going further, a page for every thing%]', () => {
  it('[%erkennt den Katalog, die Seite eines Dings und unbekannte Adressen|recognizes the catalog, the page of a thing and unknown addresses%]', () => {
    expect(parseRoute('')).toEqual({ name: 'catalog' })
    expect(parseRoute('#/')).toEqual({ name: 'catalog' })
    expect(parseRoute('#/items/6')).toEqual({ name: 'item', id: 6 })
    expect(parseRoute('#/items/[%sechs|six%]')).toEqual({ name: 'notFound' })
    expect(parseRoute('#/members')).toEqual({ name: 'notFound' })
  })

  it('[%zeigt Name, Pfand und einen Link zurück zum Katalog|shows name, deposit and a link back to the catalog%]', () => {
    document.body.innerHTML = renderDetail(items[5])
    expect(document.querySelector('h1').textContent).toBe('[%Beamer|Projector%]')
    // Intl puts a non-breaking space after CHF
    expect(document.body.textContent.replace(/\s+/g, ' ')).toContain('CHF 80.00')
    expect(document.querySelector('a[href="#/"]')).not.toBeNull()
  })

  it('[%nennt bei einem ausgeliehenen Ding das Datum, ab dem es wieder da ist|names the date from which a thing on loan is back%]', () => {
    document.body.innerHTML = renderDetail(items[1])
    expect(document.body.textContent).toContain('[%12.11.2026|11/12/2026%]')
  })

  it('[%öffnet die Seite eines Dings direkt über ihre Adresse|opens the page of a thing directly from its address%]', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => new Response(JSON.stringify(items))))
    location.hash = '#/items/6'
    document.body.innerHTML = '<main id="app"></main>'
    await start(document.querySelector('#app'))
    expect(document.querySelector('h1')?.textContent).toBe('[%Beamer|Projector%]')
  })
})
