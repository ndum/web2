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

// [%Beträge in Franken wie in der Schweiz, auch auf der englischen Seite|Amounts in francs the Swiss way, on the English page too%]
const chf = new Intl.NumberFormat('de-CH', { style: 'currency', currency: 'CHF' })
// [%Ein Datum ohne Uhrzeit, darum in UTC, so erscheint überall derselbe Tag|A date without a time, so in UTC, which shows the same day everywhere%]
const date = new Intl.DateTimeFormat('[%de-CH|en-US%]', { dateStyle: 'long', timeZone: 'UTC' })

let depositOut = 0
for (const item of items) {
  if (isIn(item)) continue
  depositOut += item.deposit
  const back = date.format(new Date(item.availableFrom))
  console.log(`${item.name}, ${chf.format(item.deposit)}, [%wieder verfügbar ab|available again from%] ${back}`)
}
console.log('[%Pfand ausgeliehen:|Deposit on loan:%]', chf.format(depositOut))
