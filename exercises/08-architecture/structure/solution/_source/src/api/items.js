// The only layer that talks to the server. The address comes from .env.example or .env.local.
const API_URL = import.meta.env.VITE_API_URL ?? '/api/[%de|en%]'

export async function fetchItems() {
  const response = await fetch(`${API_URL}/items`)
  if (!response.ok) throw new Error(`[%Die Kurs-API antwortet mit dem Status|The course API answers with the status%] ${response.status}.`)
  return response.json()
}
