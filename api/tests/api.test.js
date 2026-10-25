import assert from 'node:assert/strict'
import { mkdtempSync, rmSync } from 'node:fs'
import { createServer } from 'node:http'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { afterEach, beforeEach, describe, it } from 'node:test'

import { createApi } from '../src/app.js'

// A fixed day, Monday 2 November 2026, so the rules for the dates do not depend on today
const NOW = new Date(2026, 10, 2, 10)

let server
let base

async function start() {
  server = createServer(createApi({ now: () => NOW }))
  await new Promise((resolve) => server.listen(0, resolve))
  base = `http://localhost:${server.address().port}`
}

async function stop() {
  await new Promise((resolve) => server.close(resolve))
}

function call(path, { method = 'GET', body, cookie, origin, contentType = 'application/json' } = {}) {
  const headers = {}
  if (body !== undefined) headers['Content-Type'] = contentType
  if (cookie !== undefined) headers.Cookie = cookie
  if (origin !== undefined) headers.Origin = origin
  return fetch(`${base}${path}`, { method, headers, body: body === undefined ? undefined : JSON.stringify(body) })
}

async function signIn(number, lang = 'de') {
  const response = await call(`/${lang}/session`, { method: 'POST', body: { number } })
  return response.headers.get('set-cookie').split(';')[0]
}

describe('course API', () => {
  // A fresh API for every test, the state lives only in memory
  beforeEach(start)
  afterEach(stop)

  it('serves the catalog in German and in English', async () => {
    const de = await (await call('/de/items')).json()
    const en = await (await call('/en/items')).json()
    assert.equal(de.length, 60)
    assert.equal(de[0].name, 'Bohrmaschine')
    assert.equal(en[0].name, 'Drill')
  })

  it('serves one thing and answers 404 for an unknown one', async () => {
    assert.equal((await (await call('/de/items/6')).json()).name, 'Beamer')
    const missing = await call('/de/items/999')
    assert.equal(missing.status, 404)
    assert.equal((await missing.json()).error, 'Dieses Ding gibt es nicht.')
  })

  it('answers 404 for unknown paths and languages', async () => {
    assert.equal((await call('/de/things')).status, 404)
    assert.equal((await call('/fr/items')).status, 404)
  })

  it('waits and fails on request', async () => {
    const started = Date.now()
    await call('/de/items?delay=200')
    assert.ok(Date.now() - started >= 190)
    const failed = await call('/en/items?status=503')
    assert.equal(failed.status, 503)
    assert.equal((await failed.json()).error, 'The course API answers with the status 503.')
  })

  it('signs in with the member number and sets an HttpOnly cookie', async () => {
    const response = await call('/de/session', { method: 'POST', body: { number: ' m-117 ' } })
    assert.equal(response.status, 200)
    assert.deepEqual(await response.json(), { number: 'M-117', name: 'Martina Hostettler', team: true })
    const cookie = response.headers.get('set-cookie')
    assert.match(cookie, /^session=[\w-]+; HttpOnly; SameSite=Strict; Path=\/$/)
    const session = await call('/de/session', { cookie: cookie.split(';')[0] })
    assert.equal((await session.json()).number, 'M-117')
  })

  it('refuses an unknown member number and JSON that is missing', async () => {
    const unknown = await call('/en/session', { method: 'POST', body: { number: 'M-999' } })
    assert.equal(unknown.status, 401)
    assert.equal((await unknown.json()).error, 'We do not know this member number.')
    const form = await call('/de/session', { method: 'POST', body: { number: 'M-117' }, contentType: 'text/plain' })
    assert.equal(form.status, 415)
    const broken = await fetch(`${base}/de/session`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{' })
    assert.equal(broken.status, 400)
  })

  it('signs out and forgets the session', async () => {
    const cookie = await signIn('M-204')
    const out = await call('/de/session', { method: 'DELETE', cookie })
    assert.equal(out.status, 204)
    assert.match(out.headers.get('set-cookie'), /Max-Age=0/)
    assert.equal((await call('/de/session', { cookie })).status, 401)
  })

  it('accepts a valid request and lists the own requests', async () => {
    const cookie = await signIn('M-204')
    const sent = await call('/de/reservations', { method: 'POST', cookie, body: { itemId: 6, from: '2026-11-04', to: '2026-11-07', note: 'Vereinsabend' } })
    assert.equal(sent.status, 201)
    assert.deepEqual(await sent.json(), {
      id: 'R-1',
      itemId: 6,
      member: 'M-204',
      from: '2026-11-04',
      to: '2026-11-07',
      note: 'Vereinsabend',
      requestedAt: NOW.toISOString(),
    })
    const own = await (await call('/de/reservations', { cookie })).json()
    assert.deepEqual(own.map((request) => request.id), ['R-1'])
    const other = await (await call('/de/reservations', { cookie: await signIn('M-117') })).json()
    assert.deepEqual(other, [])
  })

  it('needs a login for requests', async () => {
    assert.equal((await call('/de/reservations')).status, 401)
    const sent = await call('/de/reservations', { method: 'POST', body: { itemId: 6, from: '2026-11-04', to: '2026-11-07' } })
    assert.equal(sent.status, 401)
    assert.equal((await sent.json()).error, 'Melde dich zuerst an.')
  })

  it('checks the rules of the association again', async () => {
    const cookie = await signIn('M-117')
    const sent = await call('/de/reservations', { method: 'POST', cookie, body: { itemId: 2, from: '2026-11-04', to: '2026-11-20', note: 'x'.repeat(201) } })
    assert.equal(sent.status, 422)
    assert.deepEqual(await sent.json(), {
      error: 'Die Anfrage enthält Fehler.',
      fields: {
        from: 'Das Ding ist erst ab 12.11.2026 wieder da.',
        to: 'Zurückbringen kannst du am Mittwoch oder am Samstag.',
        note: 'Die Notiz hat höchstens 200 Zeichen.',
      },
    })
    const long = await call('/en/reservations', { method: 'POST', cookie, body: { itemId: 6, from: '2026-11-04', to: '2026-11-14' } })
    assert.deepEqual((await long.json()).fields, { to: 'A loan lasts at most seven days.' })
    const past = await call('/de/reservations', { method: 'POST', cookie, body: { itemId: 6, from: '2026-10-28', to: '2026-10-31' } })
    assert.equal((await past.json()).fields.from, 'Der erste Tag liegt in der Vergangenheit.')
  })

  it('reports requests for days that are already requested', async () => {
    await call('/de/reservations', { method: 'POST', cookie: await signIn('M-204'), body: { itemId: 6, from: '2026-11-04', to: '2026-11-07' } })
    const overlapping = await call('/de/reservations', { method: 'POST', cookie: await signIn('M-117'), body: { itemId: 6, from: '2026-11-07', to: '2026-11-11' } })
    assert.equal(overlapping.status, 409)
    assert.equal((await overlapping.json()).error, 'Das Ding ist an einigen dieser Tage schon angefragt.')
    const later = await call('/de/reservations', { method: 'POST', cookie: await signIn('M-117'), body: { itemId: 6, from: '2026-11-11', to: '2026-11-14' } })
    assert.equal(later.status, 201)
  })

  it('withdraws only own requests', async () => {
    const cookie = await signIn('M-204')
    await call('/de/reservations', { method: 'POST', cookie, body: { itemId: 6, from: '2026-11-04', to: '2026-11-07' } })
    const foreign = await call('/de/reservations/R-1', { method: 'DELETE', cookie: await signIn('M-117') })
    assert.equal(foreign.status, 404)
    assert.equal((await call('/de/reservations/R-1', { method: 'DELETE', cookie })).status, 204)
    assert.deepEqual(await (await call('/de/reservations', { cookie })).json(), [])
  })

  it('lets only the team record a return, in both languages', async () => {
    const member = await call('/de/items/2/return', { method: 'POST', cookie: await signIn('M-204') })
    assert.equal(member.status, 403)
    assert.equal((await member.json()).error, 'Das darf nur das Team am Tresen.')
    const team = await signIn('M-117')
    const returned = await call('/de/items/2/return', { method: 'POST', cookie: team })
    assert.equal((await returned.json()).availableFrom, null)
    assert.equal((await (await call('/en/items/2')).json()).availableFrom, null)
    assert.equal((await call('/de/items/2/return', { method: 'POST', cookie: team })).status, 409)
  })

  it('keeps returns and requests in the storage folder', async () => {
    const folder = mkdtempSync(join(tmpdir(), 'course-api-'))
    const storageDir = pathToFileURL(`${folder}/`)
    async function listen() {
      const instance = createServer(createApi({ storageDir, now: () => NOW }))
      await new Promise((resolve) => instance.listen(0, resolve))
      return [instance, `http://localhost:${instance.address().port}`]
    }
    try {
      const [first, firstBase] = await listen()
      const login = await fetch(`${firstBase}/de/session`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{"number":"M-117"}' })
      await fetch(`${firstBase}/de/items/2/return`, { method: 'POST', headers: { Cookie: login.headers.get('set-cookie').split(';')[0] } })
      await new Promise((resolve) => first.close(resolve))
      // A new API with the same folder starts from the stored state
      const [restarted, restartedBase] = await listen()
      const item = await (await fetch(`${restartedBase}/de/items/2`)).json()
      await new Promise((resolve) => restarted.close(resolve))
      assert.equal(item.availableFrom, null)
    } finally {
      rmSync(folder, { recursive: true, force: true })
    }
  })

  it('allows the origins of Vite and no others', async () => {
    const vite = await call('/de/items', { origin: 'http://localhost:5173' })
    assert.equal(vite.headers.get('access-control-allow-origin'), 'http://localhost:5173')
    assert.equal(vite.headers.get('access-control-allow-credentials'), 'true')
    const other = await call('/de/items', { origin: 'https://example.com' })
    assert.equal(other.headers.get('access-control-allow-origin'), null)
    const preflight = await fetch(`${base}/de/reservations`, {
      method: 'OPTIONS',
      headers: { Origin: 'http://localhost:4173', 'Access-Control-Request-Method': 'POST', 'Access-Control-Request-Headers': 'content-type' },
    })
    assert.equal(preflight.status, 204)
    assert.equal(preflight.headers.get('access-control-allow-methods'), 'GET, POST, DELETE')
    assert.equal(preflight.headers.get('access-control-allow-headers'), 'Content-Type')
  })
})
