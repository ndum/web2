// The drill is the first thing the counter helper knows
const name = 'Drill'
const deposit = 20
// No date it is back from, so it is in
const availableFrom = null

// A form field always delivers text, even when it holds a number
const daysField = '4'
const days = Number(daysField)

console.log(name, 'CHF', deposit)
console.log('in:', availableFrom === null)
console.log('days:', days, typeof days)
