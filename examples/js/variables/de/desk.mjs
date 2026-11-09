// Die Bohrmaschine ist das erste Ding, das der Tresen-Helfer kennt
const name = 'Bohrmaschine'
const deposit = 20
// Kein Datum, ab dem sie wieder da ist, also ist sie da
const availableFrom = null

// Ein Formularfeld liefert immer Text, auch wenn darin eine Zahl steht
const daysField = '4'
const days = Number(daysField)

console.log(name, 'CHF', deposit)
console.log('da:', availableFrom === null)
console.log('Tage:', days, typeof days)
