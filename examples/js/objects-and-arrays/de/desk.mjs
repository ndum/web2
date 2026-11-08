// aus Schritt 3
const isIn = (item) => item.availableFrom === null

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

let inStock = 0
let depositOut = 0
for (const item of items) {
  if (isIn(item)) inStock += 1
  else depositOut += item.deposit
}
console.log(inStock, 'von', items.length, 'Dingen sind da')
console.log('Pfand ausgeliehen:', depositOut)
