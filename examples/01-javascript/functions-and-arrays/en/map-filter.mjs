const items = [
  { id: 1, name: 'Drill', category: 'Tools', deposit: 20, availableFrom: null },
  { id: 2, name: 'Tent for four', category: 'Camping', deposit: 50, availableFrom: '2026-11-12' },
  { id: 5, name: 'Jigsaw', category: 'Tools', deposit: 20, availableFrom: null },
  { id: 11, name: 'Cordless screwdriver', category: 'Tools', deposit: 20, availableFrom: '2026-11-05' },
]

const ids = items.map((item) => item.id)
console.log(ids)

const available = items.filter((item) => item.availableFrom === null)
console.log(available.length)

const toolsThatAreIn = items
  .filter((item) => item.category === 'Tools' && item.availableFrom === null)
  .map((item) => item.name)
console.log(toolsThatAreIn)
