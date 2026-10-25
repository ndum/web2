import { describe, expect, it } from 'vitest'

import items from '../data/items.json'
import { createMemoryApi } from '../src/api/memory.js'

// A storage like sessionStorage that only this test sees
function fakeStorage() {
  const entries = new Map()
  return { getItem: (key) => entries.get(key) ?? null, setItem: (key, value) => entries.set(key, String(value)) }
}

const REQUEST = { itemId: 6, from: '2026-11-18', to: '2026-11-21', note: '' }

describe('The stand-in of the API for the demo', () => {
  it('delivers the catalog', async () => {
    const { ok, data } = await createMemoryApi(fakeStorage()).loadItems()
    expect(ok).toBe(true)
    expect(data).toHaveLength(items.length)
  })

  it('answers 401 without a login like the course API', async () => {
    const answer = await createMemoryApi(fakeStorage()).sendReservation(REQUEST)
    expect(answer).toEqual({ ok: false, status: 401, data: { error: 'Sign in first.' } })
  })

  it('refuses the same days a second time with 409', async () => {
    const api = createMemoryApi(fakeStorage())
    await api.signIn('M-204')
    expect((await api.sendReservation(REQUEST)).status).toBe(201)
    expect((await api.sendReservation(REQUEST)).status).toBe(409)
  })

  it('lets only the team record returns', async () => {
    const api = createMemoryApi(fakeStorage())
    const onLoan = items.find((item) => item.availableFrom !== null)
    await api.signIn('M-204')
    expect((await api.recordReturn(onLoan.id)).status).toBe(403)
    await api.signIn('M-117')
    const { data } = await api.recordReturn(onLoan.id)
    expect(data.availableFrom).toBeNull()
    expect((await api.loadItems()).data.find((item) => item.id === onLoan.id).availableFrom).toBeNull()
  })

  it('keeps login and requests when the tab reloads', async () => {
    const storage = fakeStorage()
    const first = createMemoryApi(storage)
    await first.signIn('M-204')
    await first.sendReservation(REQUEST)
    const again = createMemoryApi(storage)
    expect((await again.restoreSession()).data.number).toBe('M-204')
    expect((await again.loadReservations()).data).toHaveLength(1)
  })
})
