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

// [%Der Export ist ein einziger Text, wie der Export der ganzen Tabelle|The export is one single text, like the export of the whole table%]
const text = JSON.stringify(items)
console.log(text)

// [%Beim Einlesen entstehen neue Objekte mit demselben Inhalt|Reading it back creates new objects with the same content%]
const read = JSON.parse(text)
let inStock = 0
for (const item of read) {
  if (isIn(item)) inStock += 1
}
console.log(inStock, '[%von|of%]', read.length, '[%Dingen sind da|things are in%]')

// [%Die Favoriten von M-117 speichert der Browser als Text|The browser stores the favorites of M-117 as text%]
const saved = JSON.stringify([3, 6, 8])
console.log('[%Favoriten als Text:|Favorites as text:%]', saved)

const favorites = JSON.parse(saved)
const names = []
for (const item of read) {
  if (favorites.includes(item.id)) names.push(item.name)
}
console.log(names.join(', '))
