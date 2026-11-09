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

// Der Export ist ein einziger Text, wie der Export der ganzen Tabelle
const text = JSON.stringify(items)
console.log(text)

// Beim Einlesen entstehen neue Objekte mit demselben Inhalt
const read = JSON.parse(text)
let inStock = 0
for (const item of read) {
  if (isIn(item)) inStock += 1
}
console.log(inStock, 'von', read.length, 'Dingen sind da')

// Die Favoriten von M-117 speichert der Browser als Text
const saved = JSON.stringify([3, 6, 8])
console.log('Favoriten als Text:', saved)

const favorites = JSON.parse(saved)
const names = []
for (const item of read) {
  if (favorites.includes(item.id)) names.push(item.name)
}
console.log(names.join(', '))
