const byName = (a, b) => a.name.localeCompare(b.name, 'de-CH')

// Every sort order is a strategy, a function that compares two things. The catalog builds its menu
// from these entries, so a new order is a new entry and nothing else changes.
export const sorters = {
  name: { label: 'Name', compare: byName },
  deposit: { label: 'Pfand', compare: (a, b) => a.deposit - b.deposit || byName(a, b) },
  // Things that are in come first, then the others by the day they come back
  availability: {
    label: 'Verfügbarkeit',
    compare: (a, b) => (a.availableFrom ?? '').localeCompare(b.availableFrom ?? '') || byName(a, b),
  },
}
