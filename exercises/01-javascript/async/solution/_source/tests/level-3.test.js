import { afterEach, describe, expect, it, vi } from 'vitest'

import * as load from '../src/load.js'

const url = 'http://localhost:3000/items'

afterEach(() => vi.unstubAllGlobals())

const failure = (promise) => promise.then(() => undefined, (error) => error)

// A fetch that never answers by itself, only an aborted signal ends it
const silentServer = () =>
  vi.fn(
    (address, options) =>
      new Promise((resolve, reject) => {
        options?.signal?.addEventListener('abort', () => reject(options.signal.reason))
      }),
  )

describe('[%Knobelei, nicht ewig warten|Challenge, not waiting forever%]', () => {
  it('[%gibt fetch ein Signal mit|passes a signal to fetch%]', async () => {
    const fetch = vi.fn(async () => new Response('[]'))
    vi.stubGlobal('fetch', fetch)
    await load.loadItems(url, { timeout: 1000 })
    expect(fetch.mock.calls[0][1]?.signal).toBeInstanceOf(AbortSignal)
  })

  it('[%bricht nach der angegebenen Zeit ab|gives up after the given time%]', async () => {
    vi.stubGlobal('fetch', silentServer())
    const error = await failure(load.loadItems(url, { timeout: 50 }))
    expect(error).toBeInstanceOf(load.LoadError)
    expect(error.message).toBe('[%Der Server antwortet zu langsam.|The server is too slow to answer.%]')
  })

  it('[%lädt den Katalog, wenn die Antwort rechtzeitig kommt|loads the catalog when the answer comes in time%]', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => new Response('[{"id":1}]')))
    await expect(load.loadItems(url, { timeout: 1000 })).resolves.toEqual([{ id: 1 }])
  })
})
