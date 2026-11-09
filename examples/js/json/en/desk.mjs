// from step 3
const isIn = (item) => item.availableFrom === null

// from step 4
const items = [
  { id: 1, name: 'Drill', deposit: 20, availableFrom: null },
  { id: 2, name: 'Tent for four', deposit: 50, availableFrom: '2026-11-12' },
  { id: 3, name: 'Raclette oven', deposit: 30, availableFrom: null },
  { id: 4, name: 'Beer bench set', deposit: 40, availableFrom: '2026-11-03' },
  { id: 5, name: 'Jigsaw', deposit: 20, availableFrom: null },
  { id: 6, name: 'Projector', deposit: 80, availableFrom: null },
  { id: 7, name: 'Ladder', deposit: 20, availableFrom: null },
  { id: 8, name: 'Sleeping bag', deposit: 20, availableFrom: null },
  { id: 9, name: 'Bike trailer', deposit: 60, availableFrom: '2026-11-12' },
]

// The export is one single text, like the export of the whole table
const text = JSON.stringify(items)
console.log(text)

// Reading it back creates new objects with the same content
const read = JSON.parse(text)
let inStock = 0
for (const item of read) {
  if (isIn(item)) inStock += 1
}
console.log(inStock, 'of', read.length, 'things are in')

// The browser stores the favorites of M-117 as text
const saved = JSON.stringify([3, 6, 8])
console.log('Favorites as text:', saved)

const favorites = JSON.parse(saved)
const names = []
for (const item of read) {
  if (favorites.includes(item.id)) names.push(item.name)
}
console.log(names.join(', '))
