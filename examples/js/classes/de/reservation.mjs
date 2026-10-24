class Reservation {
  #id

  constructor(id, item, from, to) {
    this.#id = id
    this.item = item
    this.from = new Date(from)
    this.to = new Date(to)
  }

  get days() {
    return (this.to - this.from) / 86_400_000 + 1
  }

  describe() {
    return `${this.#id}: ${this.item}, ${this.days} Tage`
  }
}

const reservation = new Reservation('R-1', 'Zelt', '2026-11-02', '2026-11-04')
console.log(reservation.describe())
console.log(reservation.days, reservation.id)
