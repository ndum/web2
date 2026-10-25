// The adapter for the course API. It turns addresses, methods, status codes and JSON into the answers
// the stores expect, whether it worked, the status and the data or a message. Only this layer
// calls fetch.
const TIMEOUT = 5000

export function createHttpApi(baseUrl) {
  async function call(path, { method = 'GET', body } = {}) {
    let response
    try {
      response = await fetch(`${baseUrl}${path}`, {
        method,
        headers: body === undefined ? undefined : { 'Content-Type': 'application/json' },
        body: body === undefined ? undefined : JSON.stringify(body),
        signal: AbortSignal.timeout(TIMEOUT),
      })
    } catch (error) {
      const message =
        error.name === 'TimeoutError'
          ? 'Der Server antwortet zu langsam.'
          : 'Der Server ist nicht erreichbar.'
      return { ok: false, status: 0, data: { error: message } }
    }
    if (response.status === 204) return { ok: true, status: 204, data: null }
    const data = await response
      .json()
      .catch(() => ({ error: `Der Server antwortet mit dem Status ${response.status}.` }))
    return { ok: response.ok, status: response.status, data }
  }

  return {
    loadItems: () => call('/items'),
    recordReturn: (id) => call(`/items/${id}/return`, { method: 'POST' }),
    restoreSession: () => call('/session'),
    signIn: (number) => call('/session', { method: 'POST', body: { number } }),
    signOut: () => call('/session', { method: 'DELETE' }),
    loadReservations: () => call('/reservations'),
    sendReservation: (request) => call('/reservations', { method: 'POST', body: request }),
    withdrawReservation: (id) => call(`/reservations/${id}`, { method: 'DELETE' }),
  }
}
