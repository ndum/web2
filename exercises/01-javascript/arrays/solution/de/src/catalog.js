// Names of the things of one category that are in, sorted by name
export function availableNames(items, category) {
  return items
    .filter((item) => item.category === category && item.availableFrom === null)
    .map((item) => item.name)
    .toSorted((a, b) => a.localeCompare(b, 'de-CH'))
}

// How many things there are per category, as an object with the names of the categories as keys
export function countByCategory(items) {
  return items.reduce((counts, item) => {
    counts[item.category] = (counts[item.category] ?? 0) + 1
    return counts
  }, {})
}

// Builds a test for filter from the criteria category, query and onlyAvailable, each of them optional
export function createFilter({ category, query, onlyAvailable = false } = {}) {
  const wanted = query?.trim().toLowerCase()
  return (item) =>
    (!category || item.category === category) &&
    (!wanted || item.name.toLowerCase().includes(wanted)) &&
    (!onlyAvailable || item.availableFrom === null)
}
