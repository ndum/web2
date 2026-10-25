// The address of the course API. The proxy of Vite forwards /api to it, .env.local can change it.
export const API = import.meta.env.VITE_API_URL ?? '/api/en'

// Asks the course API and returns whether it worked, the status and the answer. A body goes out
// as JSON. Without an answer, data holds a message, so the pages always have something to show.
export async function callApi(path, { method = 'GET', body } = {}) {
  let response
  try {
    response = await fetch(`${API}${path}`, {
      method,
      headers: body === undefined ? undefined : { 'Content-Type': 'application/json' },
      body: body === undefined ? undefined : JSON.stringify(body),
    })
  } catch {
    return { ok: false, status: 0, data: { error: 'The server cannot be reached.' } }
  }
  if (response.status === 204) return { ok: true, status: 204, data: null }
  const data = await response
    .json()
    .catch(() => ({ error: `The server answers with status ${response.status}.` }))
  return { ok: response.ok, status: response.status, data }
}
