// Adds a thing as often as the association owns it, every copy gets the next free id.
// structuredClone gives every copy its own parts, a spread would share them.
export function addCopies(items, thing, count) {
  for (let copy = 0; copy < count; copy += 1) {
    items.push({ ...structuredClone(thing), id: items.length + 1 })
  }
}

// Returns a new list in which the thing is lent until the given date, the old list stays unchanged
export function lend(items, id, until) {
  return items.map((item) => (item.id === id ? { ...item, availableFrom: until } : item))
}
