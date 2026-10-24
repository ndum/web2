// Helpers for the catalog of Lorraine Commons. A thing looks like
// { id: 1, name: 'Drill', category: 'Tools', deposit: 20, availableFrom: null },
// availableFrom is null while the thing is in and the return date while it is on loan.

export function countAvailable(items) {
  return items.filter((item) => item.availableFrom === null).length
}

export function findById(items, id) {
  return items.find((item) => item.id === id)
}

// Names of the things of one category that are in, sorted by name
export function availableNames(items, category) {
  return items
    .filter((item) => item.category === category && item.availableFrom === null)
    .map((item) => item.name)
    .toSorted((a, b) => a.localeCompare(b, '[%de-CH|en-US%]'))
}

// How many things there are per category, as an object with the names of the categories as keys
export function countByCategory(items) {
  return items.reduce((counts, item) => {
    counts[item.category] = (counts[item.category] ?? 0) + 1
    return counts
  }, {})
}

// The deposits that members paid for the things on loan
export function depositsOnLoan(items) {
  return items.filter((item) => item.availableFrom !== null).reduce((sum, item) => sum + item.deposit, 0)
}

// Builds a test for filter from the criteria category, query and onlyAvailable, each of them optional
export function createFilter({ category, query, onlyAvailable = false } = {}) {
  const wanted = query?.trim().toLowerCase()
  return (item) =>
    (!category || item.category === category) &&
    (!wanted || item.name.toLowerCase().includes(wanted)) &&
    (!onlyAvailable || item.availableFrom === null)
}

// Adds a thing as often as the association owns it, every copy is an object of its own with the next free id
export function addCopies(items, thing, count) {
  for (let copy = 0; copy < count; copy += 1) {
    items.push({ ...structuredClone(thing), id: items.length + 1 })
  }
}

// Returns a new list in which the thing is lent until the given date, the old list stays unchanged
export function lend(items, id, until) {
  return items.map((item) => (item.id === id ? { ...item, availableFrom: until } : item))
}
