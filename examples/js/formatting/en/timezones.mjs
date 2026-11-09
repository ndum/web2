// JavaScript reads a date without a time as midnight in UTC
const date = new Date('2026-11-12')
console.log(date.toISOString())

const format = (timeZone) => date.toLocaleDateString('en-US', { timeZone })
console.log(format('UTC'), format('Europe/Zurich'), format('America/New_York'))

// The shop in Bern opens at 10 a.m. on Saturday, November 7, which is 9 a.m. in UTC
const opening = new Date('2026-11-07T09:00:00Z')
console.log(opening.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', timeZone: 'Europe/Zurich' }))
