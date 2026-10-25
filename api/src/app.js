// The routes of the course API. Every path starts with /de or /en, which chooses the language of
// the data and of the messages. Answers are JSON, an error looks like { "error": "..." }.
import { randomUUID } from 'node:crypto'

import { messages } from './messages.js'
import { overlaps, today, validateRequest } from './rules.js'
import { createState } from './state.js'

// Vite during development and vite preview, on localhost and on 127.0.0.1
export const DEFAULT_ORIGINS = ['http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost:4173', 'http://127.0.0.1:4173']

const COOKIE = 'session'
// HttpOnly keeps the cookie away from JavaScript, SameSite=Strict away from other sites
const COOKIE_ATTRIBUTES = 'HttpOnly; SameSite=Strict; Path=/'
const MAX_BODY = 10_000

class HttpError extends Error {
  constructor(status, body) {
    super(body.error)
    this.status = status
    this.body = body
  }
}

function send(response, status, body) {
  if (body === undefined) {
    response.writeHead(status).end()
  } else {
    response.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' }).end(JSON.stringify(body))
  }
}

// The browser only hands an answer to a page of another origin when the origin is named here
function allowOrigin(request, response, origins) {
  const origin = request.headers.origin
  if (origin !== undefined && origins.includes(origin)) {
    response.setHeader('Access-Control-Allow-Origin', origin)
    response.setHeader('Access-Control-Allow-Credentials', 'true')
  }
  response.setHeader('Vary', 'Origin')
}

function sessionId(request) {
  const cookies = (request.headers.cookie ?? '').split(';').map((part) => part.trim().split('='))
  return cookies.find(([name]) => name === COOKIE)?.[1]
}

async function readJson(request, text) {
  if (!(request.headers['content-type'] ?? '').startsWith('application/json')) {
    throw new HttpError(415, { error: text.jsonOnly })
  }
  let body = ''
  for await (const chunk of request) {
    body += chunk
    if (body.length > MAX_BODY) throw new HttpError(413, { error: text.invalidJson })
  }
  let parsed
  try {
    parsed = JSON.parse(body)
  } catch {
    throw new HttpError(400, { error: text.invalidJson })
  }
  if (typeof parsed !== 'object' || parsed === null) throw new HttpError(400, { error: text.invalidJson })
  return parsed
}

export function createApi({ dataDir = new URL('../data/', import.meta.url), storageDir = null, now = () => new Date(), origins = DEFAULT_ORIGINS } = {}) {
  const state = createState(dataDir, storageDir)
  // Session id from the cookie and the member number it belongs to. A restart signs everyone out.
  const sessions = new Map()

  function currentMember(request, lang, text) {
    const number = sessions.get(sessionId(request))
    if (number === undefined) throw new HttpError(401, { error: text.notSignedIn })
    return state.member(lang, number)
  }

  function existingItem(lang, id, text) {
    const item = state.item(lang, Number(id))
    if (item === undefined) throw new HttpError(404, { error: text.unknownItem })
    return item
  }

  const routes = [
    ['GET', /^\/items$/, ({ lang }) => [200, state.items(lang)]],
    ['GET', /^\/items\/(\d+)$/, ({ lang, text, params }) => [200, existingItem(lang, params[0], text)]],
    [
      'POST',
      /^\/items\/(\d+)\/return$/,
      ({ request, lang, text, params }) => {
        if (!currentMember(request, lang, text).team) throw new HttpError(403, { error: text.teamOnly })
        const item = existingItem(lang, params[0], text)
        if (item.availableFrom === null) throw new HttpError(409, { error: text.notOnLoan })
        state.markReturned(item.id)
        return [200, state.item(lang, item.id)]
      },
    ],
    [
      'POST',
      /^\/session$/,
      async ({ request, response, lang, text }) => {
        const { number } = await readJson(request, text)
        const member = state.member(lang, String(number ?? '').trim().toUpperCase())
        if (member === undefined) throw new HttpError(401, { error: text.unknownMember })
        const id = randomUUID()
        sessions.set(id, member.number)
        // Without Expires or Max-Age the cookie ends when the browser closes
        response.setHeader('Set-Cookie', `${COOKIE}=${id}; ${COOKIE_ATTRIBUTES}`)
        return [200, member]
      },
    ],
    ['GET', /^\/session$/, ({ request, lang, text }) => [200, currentMember(request, lang, text)]],
    [
      'DELETE',
      /^\/session$/,
      ({ request, response }) => {
        sessions.delete(sessionId(request))
        response.setHeader('Set-Cookie', `${COOKIE}=; ${COOKIE_ATTRIBUTES}; Max-Age=0`)
        return [204]
      },
    ],
    [
      'GET',
      /^\/reservations$/,
      ({ request, lang, text }) => {
        const member = currentMember(request, lang, text)
        return [200, state.reservations().filter((reservation) => reservation.member === member.number)]
      },
    ],
    [
      'POST',
      /^\/reservations$/,
      async ({ request, lang, text }) => {
        const member = currentMember(request, lang, text)
        const { itemId, from, to, note = '' } = await readJson(request, text)
        const item = existingItem(lang, itemId, text)
        const fields = validateRequest({ from, to, note }, item, text, today(now()))
        if (Object.keys(fields).length > 0) throw new HttpError(422, { error: text.invalidRequest, fields })
        const candidate = { itemId: item.id, member: member.number, from, to, note }
        if (state.reservations().some((other) => overlaps(other, candidate))) {
          throw new HttpError(409, { error: text.overlap })
        }
        return [201, state.addReservation({ ...candidate, requestedAt: now().toISOString() })]
      },
    ],
    [
      'DELETE',
      /^\/reservations\/(R-\d+)$/,
      ({ request, lang, text, params }) => {
        const member = currentMember(request, lang, text)
        const reservation = state.reservations().find((entry) => entry.id === params[0])
        if (reservation === undefined || reservation.member !== member.number) {
          throw new HttpError(404, { error: text.unknownReservation })
        }
        state.removeReservation(reservation.id)
        return [204]
      },
    ],
  ]

  return async function handle(request, response) {
    allowOrigin(request, response, origins)
    // The preflight of the browser asks which methods and headers another origin may use
    if (request.method === 'OPTIONS') {
      if (response.hasHeader('Access-Control-Allow-Origin')) {
        response.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE')
        response.setHeader('Access-Control-Allow-Headers', 'Content-Type')
        response.setHeader('Access-Control-Max-Age', '600')
      }
      return send(response, 204)
    }
    const url = new URL(request.url, 'http://localhost')
    const [, lang, ...rest] = url.pathname.split('/')
    const text = messages[lang] ?? messages.en
    try {
      // ?delay=2000 waits two seconds, ?status=503 answers with that status, both for trying out the app
      const delay = Number(url.searchParams.get('delay') ?? 0)
      if (delay > 0) await new Promise((resolve) => setTimeout(resolve, delay))
      const status = Number(url.searchParams.get('status') ?? 200)
      if (status >= 400 && status <= 599) throw new HttpError(status, { error: text.status(status) })
      const path = `/${rest.join('/')}`
      for (const [method, pattern, action] of routes) {
        const match = pattern.exec(path)
        if (messages[lang] !== undefined && match !== null && method === request.method) {
          const [code, body] = await action({ request, response, lang, text, params: match.slice(1) })
          return send(response, code, body)
        }
      }
      throw new HttpError(404, { error: text.unknownPath })
    } catch (error) {
      if (!(error instanceof HttpError)) throw error
      send(response, error.status, error.body)
    }
  }
}
