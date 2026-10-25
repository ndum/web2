import { describe, expect, it } from 'vitest'

import items from '../data/items.json'
import { createMemoryApi } from '../src/api/memory.js'

// A storage like sessionStorage that only this test sees
function fakeStorage() {
  const entries = new Map()
  return { getItem: (key) => entries.get(key) ?? null, setItem: (key, value) => entries.set(key, String(value)) }
}

const REQUEST = { itemId: 6, from: '2026-11-18', to: '2026-11-21', note: '' }

describe('Die Attrappe der API für die Demo', () => {
  it('liefert den Katalog', async () => {
    const { ok, data } = await createMemoryApi(fakeStorage()).loadItems()
    expect(ok).toBe(true)
    expect(data).toHaveLength(items.length)
  })

  it('antwortet ohne Anmeldung wie die Kurs-API mit 401', async () => {
    const answer = await createMemoryApi(fakeStorage()).sendReservation(REQUEST)
    expect(answer).toEqual({ ok: false, status: 401, data: { error: 'Melde dich zuerst an.' } })
  })

  it('lehnt dieselben Tage ein zweites Mal mit 409 ab', async () => {
    const api = createMemoryApi(fakeStorage())
    await api.signIn('M-204')
    expect((await api.sendReservation(REQUEST)).status).toBe(201)
    expect((await api.sendReservation(REQUEST)).status).toBe(409)
  })

  it('lässt nur das Team Rückgaben erfassen', async () => {
    const api = createMemoryApi(fakeStorage())
    const onLoan = items.find((item) => item.availableFrom !== null)
    await api.signIn('M-204')
    expect((await api.recordReturn(onLoan.id)).status).toBe(403)
    await api.signIn('M-117')
    const { data } = await api.recordReturn(onLoan.id)
    expect(data.availableFrom).toBeNull()
    expect((await api.loadItems()).data.find((item) => item.id === onLoan.id).availableFrom).toBeNull()
  })

  it('behält Anmeldung und Anfragen, wenn der Tab neu lädt', async () => {
    const storage = fakeStorage()
    const first = createMemoryApi(storage)
    await first.signIn('M-204')
    await first.sendReservation(REQUEST)
    const again = createMemoryApi(storage)
    expect((await again.restoreSession()).data.number).toBe('M-204')
    expect((await again.loadReservations()).data).toHaveLength(1)
  })
})
