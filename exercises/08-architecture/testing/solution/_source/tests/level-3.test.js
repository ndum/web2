import { createPinia, setActivePinia } from 'pinia'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { useRequestsStore } from '@/stores/requests.js'

const REQUEST = { itemId: 6, from: '2026-11-18', to: '2026-11-21' }

// The API answers with this status and body
function answer(status, body) {
  const fetch = vi.fn(async () => new Response(JSON.stringify(body), { status }))
  vi.stubGlobal('fetch', fetch)
  return fetch
}

beforeEach(() => setActivePinia(createPinia()))
afterEach(() => vi.unstubAllGlobals())

describe('[%Knobelei, der Store mit der API|Challenge, the store with the API%]', () => {
  it('[%schickt die Anfrage als JSON mit POST an die API|sends the request as JSON with POST to the API%]', async () => {
    const fetch = answer(201, { id: 'R-1', ...REQUEST })
    await useRequestsStore().send(REQUEST)
    const [url, options] = fetch.mock.calls[0]
    expect(url).toBe('/api/[%de|en%]/reservations')
    expect(options.method).toBe('POST')
    expect(options.headers['Content-Type']).toBe('application/json')
    expect(JSON.parse(options.body)).toEqual(REQUEST)
  })

  it('[%übernimmt eine angenommene Anfrage in die Liste|adds an accepted request to the list%]', async () => {
    answer(201, { id: 'R-1', ...REQUEST })
    const store = useRequestsStore()
    expect(await store.send(REQUEST)).toBe(true)
    expect(store.list).toEqual([{ id: 'R-1', ...REQUEST }])
  })

  it('[%meldet eine Ablehnung und übernimmt nichts|reports a refusal and adds nothing%]', async () => {
    answer(409, { error: '[%Das Ding ist an einigen dieser Tage schon angefragt.|The thing is already requested for some of these days.%]' })
    const store = useRequestsStore()
    expect(await store.send(REQUEST)).toBe(false)
    expect(store.list).toEqual([])
    expect(store.error).toBe('[%Das Ding ist an einigen dieser Tage schon angefragt.|The thing is already requested for some of these days.%]')
  })
})
