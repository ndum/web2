// The only layer that talks to the server. The address comes from .env.example or .env.local.
const API_URL = import.meta.env.VITE_API_URL ?? '/api/de'

export async function fetchItems() {
  const response = await fetch(`${API_URL}/items`)
  if (!response.ok) throw new Error(`Die Kurs-API antwortet mit dem Status ${response.status}.`)
  return response.json()
}
