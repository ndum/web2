const loanDays = (from, to) => (Date.parse(to) - Date.parse(from)) / 86_400_000

class Reservation {
  constructor(number, from, to) {
    this.number = number
    this.from = from
    this.to = to
  }

  get days() {
    return loanDays(this.from, this.to)
  }

  // [%Braucht kein this, darum lässt sie sich ohne bind weitergeben|Needs no this, so it can be passed on without bind%]
  static byDays(a, b) {
    return a.days - b.days
  }
}

const reservations = [
  new Reservation('R-1', '2026-11-07', '2026-11-11'),
  new Reservation('R-2', '2026-11-07', '2026-11-14'),
  new Reservation('R-3', '2026-11-11', '2026-11-14'),
]

for (const reservation of reservations.toSorted(Reservation.byDays)) {
  console.log(reservation.number, reservation.days)
}
