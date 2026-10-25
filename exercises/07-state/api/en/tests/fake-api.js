import { vi } from 'vitest'

// Replaces fetch with a stand-in for the course API. Every route such as 'GET /items' is a
// function that gets the options of fetch and returns [status, body], or a promise of it.
export function fakeApi(routes) {
  const fetch = vi.fn(async (url, options = {}) => {
    const method = options.method ?? 'GET'
    const path = new URL(url, 'http://localhost').pathname.replace(/^\/api\/(de|en)/, '')
    const route = routes[`${method} ${path}`]
    const [status, body] = route === undefined ? [404, { error: 'unknown' }] : await route(options)
    return new Response(body === undefined ? null : JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } })
  })
  vi.stubGlobal('fetch', fetch)
  return fetch
}

// The paths that fetch was called with, such as 'GET /items'
export function calls(fetch) {
  return fetch.mock.calls.map(([url, options = {}]) => `${options.method ?? 'GET'} ${new URL(url, 'http://localhost').pathname}`)
}
