// Runs public/sw.js in Node with a stand-in for the browser: self, caches and fetch are small
// objects that record what the service worker does. Requests are plain objects with url, method
// and mode, because Node does not allow a Request in the mode navigate.
import { readFileSync } from 'node:fs'
import { runInNewContext } from 'node:vm'
import { describe, expect, it } from 'vitest'

const SOURCE = readFileSync(new URL('../public/sw.js', import.meta.url), 'utf8')
const BASE = 'https://example.org/app/'

function startWorker({ online = true } = {}) {
  const listeners = {}
  const stored = new Map()
  const names = new Set(['catalog-v0', 'catalog-v1', 'other-app-v3'])
  const fetched = []
  const network = { online }
  const key = (request) => new URL(typeof request === 'string' ? request : request.url, BASE).href
  const cache = {
    addAll: async (urls) => urls.forEach((url) => stored.set(key(url), new Response(`Kopie von ${key(url)}`))),
    put: async (request, response) => stored.set(key(request), response),
  }
  const caches = {
    open: async () => cache,
    match: async (request) => stored.get(key(request))?.clone(),
    keys: async () => [...names],
    delete: async (name) => names.delete(name),
  }
  async function fetch(request) {
    fetched.push(key(request))
    if (!network.online) throw new TypeError('Failed to fetch')
    return new Response(`Antwort für ${key(request)}`)
  }
  const self = { addEventListener: (type, listener) => (listeners[type] = listener), location: new URL('sw.js', BASE) }
  runInNewContext(SOURCE, { self, caches, fetch, Response, URL, Promise })

  async function dispatch(type, request) {
    let answer
    const waits = []
    listeners[type]({ request, respondWith: (promise) => (answer = promise), waitUntil: (promise) => waits.push(promise) })
    await Promise.all(waits)
    return answer
  }
  return { dispatch, stored, fetched, network, names }
}

const page = (path) => ({ url: BASE + path, method: 'GET', mode: 'navigate' })
const file = (path) => ({ url: BASE + path, method: 'GET', mode: 'no-cors' })

describe('der Service Worker des Katalogs', () => {
  it('legt beim Installieren die Hülle der App in den Cache', async () => {
    const worker = startWorker()
    await worker.dispatch('install')
    expect([...worker.stored.keys()]).toEqual([BASE, `${BASE}index.html`, `${BASE}manifest.webmanifest`])
  })

  it('löscht beim Aktivieren nur die eigenen alten Caches', async () => {
    const worker = startWorker()
    await worker.dispatch('activate')
    expect([...worker.names]).toEqual(['catalog-v1', 'other-app-v3'])
  })

  it('beantwortet jede Adresse offline mit index.html', async () => {
    const worker = startWorker()
    await worker.dispatch('install')
    worker.network.online = false
    const response = await worker.dispatch('fetch', page('items/7'))
    expect(await response.text()).toBe(`Kopie von ${BASE}index.html`)
  })

  it('holt Dateien der App nur einmal aus dem Netz', async () => {
    const worker = startWorker()
    await (await worker.dispatch('fetch', file('assets/index.js'))).text()
    await (await worker.dispatch('fetch', file('assets/index.js'))).text()
    expect(worker.fetched).toEqual([`${BASE}assets/index.js`])
  })

  it('fragt Daten zuerst beim Netz und nimmt offline die letzte Antwort', async () => {
    const worker = startWorker()
    expect(await (await worker.dispatch('fetch', file('api/items'))).text()).toBe(`Antwort für ${BASE}api/items`)
    worker.network.online = false
    expect(await (await worker.dispatch('fetch', file('api/items'))).text()).toBe(`Antwort für ${BASE}api/items`)
    expect(worker.fetched).toHaveLength(2)
  })

  it('lässt Anfragen an andere Origins in Ruhe', async () => {
    const worker = startWorker()
    expect(await worker.dispatch('fetch', { url: 'https://other.example/data.json', method: 'GET', mode: 'cors' })).toBeUndefined()
  })
})
