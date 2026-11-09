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

// Every name gets as long as the longest one, so the amounts line up
let width = 0
for (const item of items) width = Math.max(width, item.name.length)

function line(item) {
  const state = isIn(item) ? 'in' : `back ${item.availableFrom}`
  return `${String(item.id).padStart(2)} ${item.name.padEnd(width)} CHF ${item.deposit} ${state}`
}

// Search terms come with spaces and in any case
function search(items, query) {
  const wanted = query.trim().toLowerCase()
  const hits = []
  for (const item of items) {
    if (item.name.toLowerCase().includes(wanted)) hits.push(item)
  }
  return hits
}

for (const item of items) console.log(line(item))

const query = 'tent '
console.log(`Hits for "${query.trim()}"`)
for (const item of search(items, query)) console.log(line(item))
