import type { Item } from './types'

// The things whose name contains the search text, without regard to case
export function search(items: Item[], query: string): Item[] {
  const text = query.trim().toLowerCase()
  return items.filter((item) => item.name.toLowerCase().includes(text))
}
