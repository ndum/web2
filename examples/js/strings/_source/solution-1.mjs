const isIn = (item) => item.availableFrom === null

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
items.push({ id: 10, name: '[%Rasenmäher|Lawn mower%]', deposit: 40, availableFrom: null })

let width = 0
for (const item of items) width = Math.max(width, item.name.length)

function line(item) {
  const state = isIn(item) ? '[%da|in%]' : `[%ab|back%] ${item.availableFrom}`
  return `${String(item.id).padStart(2)} ${item.name.padEnd(width)} CHF ${item.deposit} ${state}`
}

console.log(line(items[8]))
console.log(line(items[9]))
