// The things whose name contains the search text, without regard to case
export function search(items, query) {
  const text = query.trim().toLowerCase()
  return items.filter((item) => item.name.toLowerCase().includes(text))
}
