class Reservation {
  constructor(item, member, from, to) {
    this.item = item
    this.member = member
    this.from = from
    this.to = to
  }

  // Picking up on the return day is no overlap, which is why it says < and not <=
  overlaps(other) {
    return this.item.id === other.item.id && this.from < other.to && other.from < this.to
  }
}

const projector = { id: 6, name: 'Projector', deposit: 80, availableFrom: null }
const first = new Reservation(projector, 'M-117', '2026-11-07', '2026-11-11')
const second = new Reservation(projector, 'M-204', '2026-11-11', '2026-11-14')
const third = new Reservation(projector, 'M-204', '2026-11-07', '2026-11-14')

console.log(first.overlaps(second), first.overlaps(third))
