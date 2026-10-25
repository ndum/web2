import { afterEach, describe, expect, it, vi } from 'vitest'

import { loadItems } from '../src/load.js'

const url = 'http://localhost:3000/items'
const items = [
  { id: 1, name: 'Bohrmaschine' },
  { id: 6, name: 'Beamer' },
]

// The tests replace fetch, so they need no server
const answer = (body, status = 200) => vi.fn(async () => new Response(JSON.stringify(body), { status }))

afterEach(() => vi.unstubAllGlobals())

describe('Einstieg, den Katalog mit fetch laden', () => {
  it('fragt den Server unter der übergebenen Adresse an', async () => {
    const fetch = answer(items)
    vi.stubGlobal('fetch', fetch)
    await loadItems(url)
    expect(fetch).toHaveBeenCalledOnce()
    expect(fetch.mock.calls[0][0]).toBe(url)
  })

  it('gibt die Dinge als Array zurück', async () => {
    vi.stubGlobal('fetch', answer(items))
    await expect(loadItems(url)).resolves.toEqual(items)
  })

  it('gibt ein Promise zurück', () => {
    vi.stubGlobal('fetch', answer(items))
    expect(loadItems(url)).toBeInstanceOf(Promise)
  })
})
