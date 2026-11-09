// aus Schritt 3
const isIn = (item) => item.availableFrom === null

// aus Schritt 4
const items = [
  { id: 1, name: 'Bohrmaschine', deposit: 20, availableFrom: null },
  { id: 2, name: 'Zelt für vier Personen', deposit: 50, availableFrom: '2026-11-12' },
  { id: 3, name: 'Raclette-Ofen', deposit: 30, availableFrom: null },
  { id: 4, name: 'Festbankgarnitur', deposit: 40, availableFrom: '2026-11-03' },
  { id: 5, name: 'Stichsäge', deposit: 20, availableFrom: null },
  { id: 6, name: 'Beamer', deposit: 80, availableFrom: null },
  { id: 7, name: 'Leiter', deposit: 20, availableFrom: null },
  { id: 8, name: 'Schlafsack', deposit: 20, availableFrom: null },
  { id: 9, name: 'Velo-Anhänger', deposit: 60, availableFrom: '2026-11-12' },
]

// Jeder Name wird so lang wie der längste, so stehen die Beträge untereinander
let width = 0
for (const item of items) width = Math.max(width, item.name.length)

function line(item) {
  const state = isIn(item) ? 'da' : `ab ${item.availableFrom}`
  return `${String(item.id).padStart(2)} ${item.name.padEnd(width)} CHF ${item.deposit} ${state}`
}

// Suchbegriffe kommen mit Leerzeichen und in jeder Schreibweise
function search(items, query) {
  const wanted = query.trim().toLowerCase()
  const hits = []
  for (const item of items) {
    if (item.name.toLowerCase().includes(wanted)) hits.push(item)
  }
  return hits
}

for (const item of items) console.log(line(item))

const query = 'zelt '
console.log(`Treffer für «${query.trim()}»`)
for (const item of search(items, query)) console.log(line(item))
