// Adds a thing as often as the association owns it, every copy gets the next free id
export function addCopies(items, thing, count) {
  for (let copy = 0; copy < count; copy += 1) {
    thing.id = items.length + 1
    items.push(thing)
  }
}

// Marks a thing as lent until the given date
export function lend(items, id, until) {
  const item = items.find((item) => item.id === id)
  item.availableFrom = until
  return items
}
