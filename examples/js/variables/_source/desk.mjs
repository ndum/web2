// [%Die Bohrmaschine ist das erste Ding, das der Tresen-Helfer kennt|The drill is the first thing the counter helper knows%]
const name = '[%Bohrmaschine|Drill%]'
const deposit = 20
// [%Kein Datum, ab dem sie wieder da ist, also ist sie da|No date it is back from, so it is in%]
const availableFrom = null

// [%Ein Formularfeld liefert immer Text, auch wenn darin eine Zahl steht|A form field always delivers text, even when it holds a number%]
const daysField = '4'
const days = Number(daysField)

console.log(name, 'CHF', deposit)
console.log('[%da:|in:%]', availableFrom === null)
console.log('[%Tage:|days:%]', days, typeof days)
