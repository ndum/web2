const reservation = {
  from: new Date('2026-11-02'),
  to: new Date('2026-11-04'),
  get days() {
    return (this.to - this.from) / 86_400_000 + 1
  },
}
console.log(reservation.days)
reservation.to = new Date('2026-11-06')
console.log(reservation.days)

const item = {
  storedDeposit: 20,
  get deposit() {
    return this.storedDeposit
  },
  set deposit(value) {
    if (value < 10 || value > 80) throw new RangeError('Das Pfand liegt zwischen 10 und 80 Franken')
    this.storedDeposit = value
  },
}
item.deposit = 30
console.log(item.deposit)
try {
  item.deposit = 120
} catch (error) {
  console.log(error.message)
}
