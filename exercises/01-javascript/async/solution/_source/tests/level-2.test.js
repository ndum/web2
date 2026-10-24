import { afterEach, describe, expect, it, vi } from 'vitest'

import * as load from '../src/load.js'

const url = 'http://localhost:3000/items'

afterEach(() => vi.unstubAllGlobals())

// Waits for the promise and returns what it was rejected with
const failure = (promise) => promise.then(() => undefined, (error) => error)

describe('[%Vertiefung, Fehler verständlich melden|Going further, reporting errors clearly%]', () => {
  it('[%exportiert eine Fehlerklasse LoadError|exports an error class LoadError%]', () => {
    expect(load.LoadError, '[%Exportiere eine Klasse LoadError aus src/load.js|Export a class LoadError from src/load.js%]').toBeTypeOf('function')
    expect(new load.LoadError('test')).toBeInstanceOf(Error)
  })

  it('[%meldet, mit welchem Status der Server antwortet|reports the status the server answers with%]', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => new Response('Status 503', { status: 503 })))
    const error = await failure(load.loadItems(url))
    expect(error).toBeInstanceOf(load.LoadError)
    expect(error.message).toBe('[%Der Server antwortet mit dem Status 503.|The server answers with status 503.%]')
  })

  it('[%meldet, wenn der Server nicht erreichbar ist|reports when the server cannot be reached%]', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => {
      throw new TypeError('fetch failed')
    }))
    const error = await failure(load.loadItems(url))
    expect(error).toBeInstanceOf(load.LoadError)
    expect(error.message).toBe('[%Der Server ist nicht erreichbar.|The server cannot be reached.%]')
  })
})
