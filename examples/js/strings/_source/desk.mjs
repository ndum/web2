// [%aus Schritt 3|from step 3%]
const isIn = (item) => item.availableFrom === null

// [%aus Schritt 4|from step 4%]
const items = [
  { id: 1, name: '[%Bohrmaschine|Drill%]', deposit: 20, availableFrom: null },
  { id: 2, name: '[%Zelt für vier Personen|Tent for four%]', deposit: 50, availableFrom: '2026-11-12' },
  { id: 3, name: '[%Raclette-Ofen|Raclette oven%]', deposit: 30, availableFrom: null },
  { id: 4, name: '[%Festbankgarnitur|Beer bench set%]', deposit: 40, availableFrom: '2026-11-03' },
  { id: 5, name: '[%Stichsäge|Jigsaw%]', deposit: 20, availableFrom: null },
  { id: 6, name: '[%Beamer|Projector%]', deposit: 80, availableFrom: null },
  { id: 7, name: '[%Leiter|Ladder%]', deposit: 20, availableFrom: null },
  { id: 8, name: '[%Schlafsack|Sleeping bag%]', deposit: 20, availableFrom: null },
  { id: 9, name: '[%Velo-Anhänger|Bike trailer%]', deposit: 60, availableFrom: '2026-11-12' },
]

// [%Jeder Name wird so lang wie der längste, so stehen die Beträge untereinander|Every name gets as long as the longest one, so the amounts line up%]
let width = 0
for (const item of items) width = Math.max(width, item.name.length)

function line(item) {
  const state = isIn(item) ? '[%da|in%]' : `[%ab|back%] ${item.availableFrom}`
  return `${String(item.id).padStart(2)} ${item.name.padEnd(width)} CHF ${item.deposit} ${state}`
}

// [%Suchbegriffe kommen mit Leerzeichen und in jeder Schreibweise|Search terms come with spaces and in any case%]
function search(items, query) {
  const wanted = query.trim().toLowerCase()
  const hits = []
  for (const item of items) {
    if (item.name.toLowerCase().includes(wanted)) hits.push(item)
  }
  return hits
}

for (const item of items) console.log(line(item))

const query = '[%zelt |tent %]'
console.log(`[%Treffer für «${query.trim()}»|Hits for "${query.trim()}"%]`)
for (const item of search(items, query)) console.log(line(item))
