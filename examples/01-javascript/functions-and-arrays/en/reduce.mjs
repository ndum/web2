const items = [
  { id: 1, name: 'Drill', category: 'Tools', deposit: 20, availableFrom: null },
  { id: 2, name: 'Tent for four', category: 'Camping', deposit: 50, availableFrom: '2026-11-12' },
  { id: 5, name: 'Jigsaw', category: 'Tools', deposit: 20, availableFrom: null },
  { id: 11, name: 'Cordless screwdriver', category: 'Tools', deposit: 20, availableFrom: '2026-11-05' },
]

const total = items.reduce((sum, item) => sum + item.deposit, 0)
console.log(total)

const perCategory = items.reduce((counts, item) => {
  counts[item.category] = (counts[item.category] ?? 0) + 1
  return counts
}, {})
console.log(perCategory)

const groups = Object.groupBy(items, (item) => item.category)
console.log(Object.keys(groups), groups['Tools'].length)
