import { vi } from 'vitest'

import items from '../data/items.json'

const MEMBERS = [
  { number: 'M-117', name: 'Martina Hostettler', team: true },
  { number: 'M-204', name: 'Mitglied M-204', team: false },
]

const NOT_SIGNED_IN = [401, { error: 'Melde dich zuerst an.' }]

// A stand-in for the course API with its routes and answers. It keeps the session, the returns
// and the requests like the real API, but only for one test, and it leaves the dates to the app.
export function fakeApi({ member = null, requests = [] } = {}) {
  const state = {
    items: structuredClone(items),
    member: MEMBERS.find((entry) => entry.number === member) ?? null,
    requests: structuredClone(requests),
  }
  const routes = [
    ['GET', /^\/items$/, () => [200, state.items]],
    ['GET', /^\/session$/, () => (state.member ? [200, state.member] : NOT_SIGNED_IN)],
    [
      'POST',
      /^\/session$/,
      ({ number }) => {
        const found = MEMBERS.find((entry) => entry.number === String(number).trim().toUpperCase())
        if (found === undefined) return [401, { error: 'Diese Mitgliedernummer kennen wir nicht.' }]
        state.member = found
        return [200, found]
      },
    ],
    [
      'DELETE',
      /^\/session$/,
      () => {
        state.member = null
        return [204]
      },
    ],
    ['GET', /^\/reservations$/, () => (state.member ? [200, state.requests.filter((request) => request.member === state.member.number)] : NOT_SIGNED_IN)],
    [
      'POST',
      /^\/reservations$/,
      (body) => {
        if (state.member === null) return NOT_SIGNED_IN
        if (state.requests.some((other) => other.itemId === body.itemId && other.from <= body.to && body.from <= other.to)) {
          return [409, { error: 'Das Ding ist an einigen dieser Tage schon angefragt.' }]
        }
        const request = { id: `R-${state.requests.length + 1}`, member: state.member.number, ...body }
        state.requests.push(request)
        return [201, request]
      },
    ],
    [
      'DELETE',
      /^\/reservations\/(R-\d+)$/,
      (body, [id]) => {
        state.requests = state.requests.filter((request) => request.id !== id)
        return [204]
      },
    ],
    [
      'POST',
      /^\/items\/(\d+)\/return$/,
      (body, [id]) => {
        if (!state.member?.team) return [403, { error: 'Das darf nur das Team am Tresen.' }]
        const item = state.items.find((entry) => entry.id === Number(id))
        item.availableFrom = null
        return [200, item]
      },
    ],
  ]
  const fetch = vi.fn(async (url, options = {}) => {
    const method = options.method ?? 'GET'
    const path = new URL(url, 'http://localhost').pathname.replace(/^\/api\/(de|en)/, '')
    for (const [routeMethod, pattern, answer] of routes) {
      const match = pattern.exec(path)
      if (match === null || routeMethod !== method) continue
      const [status, body] = answer(options.body ? JSON.parse(options.body) : {}, match.slice(1))
      return new Response(body === undefined ? null : JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } })
    }
    return new Response(JSON.stringify({ error: 'unknown' }), { status: 404 })
  })
  vi.stubGlobal('fetch', fetch)
  return { state, fetch }
}

// The requests that reached the stand-in, such as 'POST /reservations'
export const callsOf = (fetch) =>
  fetch.mock.calls.map(([url, options = {}]) => `${options.method ?? 'GET'} ${new URL(url, 'http://localhost').pathname.replace(/^\/api\/(de|en)/, '')}`)
