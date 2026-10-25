// A stand-in for the course API inside the preview of the playground, which has no server.
// It answers fetch calls below /api/ like the course API and passes every other call on.
import { things } from './things.js'

const realFetch = window.fetch.bind(window)
const requests = []

function answer(status, body) {
  return new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } })
}

// Waits like a slow network, an aborted signal ends the wait as it ends a real request
function wait(ms, signal) {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) return reject(signal.reason)
    const timer = setTimeout(resolve, ms)
    signal?.addEventListener('abort', () => {
      clearTimeout(timer)
      reject(signal.reason)
    })
  })
}

window.fetch = async (input, options = {}) => {
  const url = new URL(input, 'http://localhost')
  if (!url.pathname.startsWith('/api/')) return realFetch(input, options)
  const path = url.pathname.slice('/api'.length)
  const method = options.method ?? 'GET'
  // One thing takes between 200 and 1200 milliseconds, everything else 500, ?delay sets the time
  const random = path.startsWith('/items/') ? 200 + Math.random() * 1000 : 500
  await wait(Number(url.searchParams.get('delay') ?? random), options.signal)
  const status = Number(url.searchParams.get('status') ?? 200)
  if (status !== 200) return answer(status, { error: `[%Die Kurs-API antwortet mit dem Status|The course API answers with the status%] ${status}.` })

  if (method === 'GET' && path === '/items') return answer(200, things)
  const item = /^\/items\/(\d+)$/.exec(path)
  if (method === 'GET' && item !== null) {
    const thing = things.find((entry) => entry.id === Number(item[1]))
    return thing ? answer(200, thing) : answer(404, { error: '[%Dieses Ding gibt es nicht.|This thing does not exist.%]' })
  }
  if (method === 'GET' && path === '/reservations') return answer(200, requests)
  if (method === 'POST' && path === '/reservations') {
    // The stand-in acts as if M-117 were signed in
    const { itemId, from = '', to = '', note = '' } = JSON.parse(options.body)
    const fields = {}
    if (from === '') fields.from = '[%Wähl den ersten Tag.|Choose the first day.%]'
    if (to === '') fields.to = '[%Wähl den letzten Tag.|Choose the last day.%]'
    if (Object.keys(fields).length > 0) return answer(422, { error: '[%Die Anfrage enthält Fehler.|The request contains errors.%]', fields })
    if (requests.some((other) => other.itemId === itemId && other.from <= to && from <= other.to)) {
      return answer(409, { error: '[%Das Ding ist an einigen dieser Tage schon angefragt.|The thing is already requested for some of these days.%]' })
    }
    const request = { id: `R-${requests.length + 1}`, itemId, member: 'M-117', from, to, note }
    requests.push(request)
    return answer(201, request)
  }
  return answer(404, { error: '[%Diese Adresse kennt die Kurs-API nicht.|The course API does not know this address.%]' })
}
