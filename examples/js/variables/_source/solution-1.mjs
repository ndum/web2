const name = '[%Zelt für vier Personen|Tent for four%]'
const deposit = 50
// [%Das Zelt ist ausgeliehen und ab dem 12. November wieder da|The tent is on loan and back from November 12%]
const availableFrom = '2026-11-12'

console.log(name, 'CHF', deposit)
console.log('[%da:|in:%]', availableFrom === null)
console.log(typeof availableFrom)
