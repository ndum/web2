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

// Beträge in Franken wie in der Schweiz, auch auf der englischen Seite
const chf = new Intl.NumberFormat('de-CH', { style: 'currency', currency: 'CHF' })
// Ein Datum ohne Uhrzeit, darum in UTC, so erscheint überall derselbe Tag
const date = new Intl.DateTimeFormat('de-CH', { dateStyle: 'long', timeZone: 'UTC' })

let depositOut = 0
for (const item of items) {
  if (isIn(item)) continue
  depositOut += item.deposit
  const back = date.format(new Date(item.availableFrom))
  console.log(`${item.name}, ${chf.format(item.deposit)}, wieder verfügbar ab ${back}`)
}
console.log('Pfand ausgeliehen:', chf.format(depositOut))
