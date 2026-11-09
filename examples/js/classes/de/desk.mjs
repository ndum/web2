// aus Schritt 3
const loanDays = (from, to) => (Date.parse(to) - Date.parse(from)) / 86_400_000

function makeNumbering(prefix) {
  let count = 0
  return () => {
    count += 1
    return prefix + '-' + count
  }
}
const nextNumber = makeNumbering('R')

// aus Schritt 4, die zwei Dinge, die M-117 reserviert
const projector = { id: 6, name: 'Beamer', deposit: 80, availableFrom: null }
const benchSet = { id: 4, name: 'Festbankgarnitur', deposit: 40, availableFrom: '2026-11-03' }

class Reservation {
  // Abholen und Zurückbringen als ISO-Datum, damit sich die Tage rechnen und vergleichen lassen
  constructor(item, member, from, to) {
    this.number = nextNumber()
    this.item = item
    this.member = member
    this.from = from
    this.to = to
  }

  get days() {
    return loanDays(this.from, this.to)
  }

  toString() {
    return `${this.number} ${this.item.name} für ${this.member}, ${this.from} bis ${this.to}, ${this.days} Tage`
  }
}

const reservations = [
  new Reservation(projector, 'M-117', '2026-11-07', '2026-11-11'),
  new Reservation(benchSet, 'M-117', '2026-11-07', '2026-11-14'),
]
for (const reservation of reservations) console.log(`${reservation}`)
