export function countAvailable(items) {
  let count = 0
  for (const item of items) {
    if (item.availableFrom === null) count += 1
  }
  return count
}

export function findById(items, id) {
  for (const item of items) {
    if (item.id === id) return item
  }
  return undefined
}
