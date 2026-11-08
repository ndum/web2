// [%aus Schritt 3|from step 3%]
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

let inStock = 0
let depositOut = 0
for (const item of items) {
  if (isIn(item)) inStock += 1
  else depositOut += item.deposit
}
console.log(inStock, '[%von|of%]', items.length, '[%Dingen sind da|things are in%]')
console.log('[%Pfand ausgeliehen:|Deposit on loan:%]', depositOut)
