// from step 3
const loanDays = (from, to) => (Date.parse(to) - Date.parse(from)) / 86_400_000

function makeNumbering(prefix) {
  let count = 0
  return () => {
    count += 1
    return prefix + '-' + count
  }
}
const nextNumber = makeNumbering('R')

// from step 4, the two things M-117 reserves
const projector = { id: 6, name: 'Projector', deposit: 80, availableFrom: null }
const benchSet = { id: 4, name: 'Beer bench set', deposit: 40, availableFrom: '2026-11-03' }

class Reservation {
  // Pickup and return as ISO dates, so the days can be counted and compared
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
    return `${this.number} ${this.item.name} for ${this.member}, ${this.from} to ${this.to}, ${this.days} days`
  }
}

const reservations = [
  new Reservation(projector, 'M-117', '2026-11-07', '2026-11-11'),
  new Reservation(benchSet, 'M-117', '2026-11-07', '2026-11-14'),
]
for (const reservation of reservations) console.log(`${reservation}`)
