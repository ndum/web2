// The address of the course API. The proxy of Vite forwards /api to it, .env.local can change it.
export const API = import.meta.env.VITE_API_URL ?? '/api/en'

async function answer(response) {
  const body = await response.json()
  if (!response.ok) throw new Error(body.error ?? `The course API answers with the status ${response.status}.`)
  return body
}

export async function getJson(path, { signal } = {}) {
  return answer(await fetch(`${API}${path}`, { signal }))
}

export async function postJson(path, body) {
  return answer(await fetch(`${API}${path}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }))
}
