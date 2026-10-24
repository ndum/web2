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

describe('Catalog in the browser', () => {
  it('shows all 60 things with a link to their page', async () => {
    await start(app())
    const links = app().querySelectorAll('.catalog li a')
    expect(links).toHaveLength(60)
    expect(links[5].getAttribute('href')).toBe('#/items/6')
  })

  it('says for every thing whether it is in', async () => {
    await start(app())
    const entries = app().querySelectorAll('.catalog li')
    expect(entries[0].textContent).toContain('Available')
    expect(entries[1].textContent).toContain('On loan')
  })

  it('searches the name without the search field losing its focus', async () => {
    await start(app())
    const field = app().querySelector('#search')
    field.focus()
    field.value = 'saw'
    field.dispatchEvent(new Event('input', { bubbles: true }))
    expect(app().querySelectorAll('.catalog li')).toHaveLength(2)
    expect(document.activeElement).toBe(field)
  })
})
