import { spawn, spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

import { afterEach, describe, expect, it, vi } from 'vitest'

import { LoadError, loadItems } from '../src/index.js'

const project = fileURLToPath(new URL('..', import.meta.url))
const url = 'http://localhost:3000/items'
const failure = (promise) => promise.then(() => undefined, (error) => error)

afterEach(() => vi.unstubAllGlobals())

// Runs src/main.js with the catalog address in the environment
const runMain = (address) =>
  spawnSync(process.execPath, ['src/main.js'], { cwd: project, env: { ...process.env, CATALOG_URL: address }, encoding: 'utf8' })

describe('[%Katalog vom Server des Vereins|Catalog from the association\'s server%]', () => {
  it('[%meldet, mit welchem Status der Server antwortet|reports the status the server answers with%]', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => new Response('Status 503', { status: 503 })))
    const error = await failure(loadItems(url))
    expect(error).toBeInstanceOf(LoadError)
    expect(error.message).toBe('[%Der Server antwortet mit dem Status 503.|The server answers with status 503.%]')
  })

  it('[%gibt nach der Wartezeit auf|gives up after the timeout%]', async () => {
    vi.stubGlobal('fetch', vi.fn((address, options) => new Promise((resolve, reject) => {
      options.signal.addEventListener('abort', () => reject(options.signal.reason))
    })))
    const error = await failure(loadItems(url, { timeout: 50 }))
    expect(error.message).toBe('[%Der Server antwortet zu langsam.|The server is too slow to answer.%]')
  })

  it('[%lädt den Katalog vom Server und gibt die Übersicht aus|loads the catalog from the server and prints the overview%]', async () => {
    const server = spawn(process.execPath, ['server.js'], { cwd: project, env: { ...process.env, PORT: '0' } })
    try {
      const address = await new Promise((resolve) => {
        server.stdout.once('data', (chunk) => resolve(/http:\S+/.exec(String(chunk))[0]))
      })
      expect(runMain(address).stdout).toContain('[%49 von 60 Dingen sind da.|49 of 60 things are in.%]')
    } finally {
      server.kill()
    }
  })

  it('[%sagt, wenn der Server nicht läuft|says so when the server is not running%]', () => {
    expect(runMain('http://localhost:9/items').stdout.trim()).toBe('[%Der Server ist nicht erreichbar.|The server cannot be reached.%]')
  })
})
