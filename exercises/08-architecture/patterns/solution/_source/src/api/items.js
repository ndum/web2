import { toItem } from './adapter.js'

// The lending software delivers its things as things.json, the adapter turns them into items
export async function fetchItems() {
  const response = await fetch(`${import.meta.env.BASE_URL}things.json`)
  if (!response.ok) throw new Error(`[%Die Ausleihsoftware antwortet mit dem Status|The lending software answers with the status%] ${response.status}.`)
  const things = await response.json()
  return things.map(toItem)
}
