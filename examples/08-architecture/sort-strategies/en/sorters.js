const byName = (a, b) => a.name.localeCompare(b.name, 'en')

// Every sort order is a strategy with a label and a function that compares two things
export const sorters = {
  name: { label: 'Name', compare: byName },
  deposit: { label: 'Deposit', compare: (a, b) => a.deposit - b.deposit || byName(a, b) },
  availability: {
    label: 'Availability',
    compare: (a, b) => (a.availableFrom ?? '').localeCompare(b.availableFrom ?? '') || byName(a, b),
  },
}
