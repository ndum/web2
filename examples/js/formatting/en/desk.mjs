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

// Amounts in francs the Swiss way, on the English page too
const chf = new Intl.NumberFormat('de-CH', { style: 'currency', currency: 'CHF' })
// A date without a time, so in UTC, which shows the same day everywhere
const date = new Intl.DateTimeFormat('en-US', { dateStyle: 'long', timeZone: 'UTC' })

let depositOut = 0
for (const item of items) {
  if (isIn(item)) continue
  depositOut += item.deposit
  const back = date.format(new Date(item.availableFrom))
  console.log(`${item.name}, ${chf.format(item.deposit)}, available again from ${back}`)
}
console.log('Deposit on loan:', chf.format(depositOut))
