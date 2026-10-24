import { afterEach, describe, expect, it, vi } from 'vitest'

import * as load from '../src/load.js'

const url = 'http://localhost:3000/items'

afterEach(() => vi.unstubAllGlobals())

// Waits for the promise and returns what it was rejected with
const failure = (promise) => promise.then(() => undefined, (error) => error)

describe('Going further, reporting errors clearly', () => {
  it('exports an error class LoadError', () => {
    expect(load.LoadError, 'Export a class LoadError from src/load.js').toBeTypeOf('function')
    expect(new load.LoadError('test')).toBeInstanceOf(Error)
  })

  it('reports the status the server answers with', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => new Response('Status 503', { status: 503 })))
    const error = await failure(load.loadItems(url))
    expect(error).toBeInstanceOf(load.LoadError)
    expect(error.message).toBe('The server answers with status 503.')
  })

  it('reports when the server cannot be reached', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => {
      throw new TypeError('fetch failed')
    }))
    const error = await failure(load.loadItems(url))
    expect(error).toBeInstanceOf(load.LoadError)
    expect(error.message).toBe('The server cannot be reached.')
  })
})
