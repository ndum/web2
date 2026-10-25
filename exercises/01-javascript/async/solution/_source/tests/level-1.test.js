import { afterEach, describe, expect, it, vi } from 'vitest'

import { loadItems } from '../src/load.js'

const url = 'http://localhost:3000/items'
const items = [
  { id: 1, name: '[%Bohrmaschine|Drill%]' },
  { id: 6, name: '[%Beamer|Projector%]' },
]

// The tests replace fetch, so they need no server
const answer = (body, status = 200) => vi.fn(async () => new Response(JSON.stringify(body), { status }))

afterEach(() => vi.unstubAllGlobals())

describe('[%Einstieg, den Katalog mit fetch laden|Getting started, loading the catalog with fetch%]', () => {
  it('[%fragt den Server unter der übergebenen Adresse an|asks the server at the address passed in%]', async () => {
    const fetch = answer(items)
    vi.stubGlobal('fetch', fetch)
    await loadItems(url)
    expect(fetch).toHaveBeenCalledOnce()
    expect(fetch.mock.calls[0][0]).toBe(url)
  })

  it('[%gibt die Dinge als Array zurück|returns the things as an array%]', async () => {
    vi.stubGlobal('fetch', answer(items))
    await expect(loadItems(url)).resolves.toEqual(items)
  })

  it('[%gibt ein Promise zurück|returns a promise%]', () => {
    vi.stubGlobal('fetch', answer(items))
    expect(loadItems(url)).toBeInstanceOf(Promise)
  })
})
