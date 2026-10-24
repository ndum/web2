class Reservation {
  constructor(item, from, to) {
    this.item = item
    this.from = new Date(from)
    this.to = new Date(to)
  }

  overlaps(other) {
    return this.item === other.item && this.from <= other.to && other.from <= this.to
  }
}

const first = new Reservation('Tent', '2026-11-02', '2026-11-04')
const second = new Reservation('Tent', '2026-11-04', '2026-11-06')
const third = new Reservation('Tent', '2026-11-05', '2026-11-06')
console.log(first.overlaps(second), first.overlaps(third))
