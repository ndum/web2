// Der Tresen-Helfer nach Schritt 3
const isIn = (item) => item.availableFrom === null
const loanDays = (from, to) => (Date.parse(to) - Date.parse(from)) / 86_400_000

// Jede Reservation bekommt eine Nummer, R-1, R-2 und so weiter
function makeNumbering(prefix) {
  let count = 0
  return () => {
    count += 1
    return prefix + '-' + count
  }
}
const nextNumber = makeNumbering('R')

const drill = { name: 'Bohrmaschine', availableFrom: null }
console.log(drill.name, isIn(drill))
console.log(loanDays('2026-11-07', '2026-11-11'), 'Tage')
console.log(nextNumber(), nextNumber())
