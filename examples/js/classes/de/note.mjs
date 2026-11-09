class Reservation {
  #note = ''

  constructor(number, member) {
    this.number = number
    this.member = member
  }

  get note() {
    return this.#note
  }

  // Jede Notiz läuft durch den Setter, so hat sie nie mehr als 200 Zeichen
  set note(text) {
    this.#note = text.trim().slice(0, 200)
  }
}

const reservation = new Reservation('R-1', 'M-117')
reservation.note = '  Holt den Beamer um 11 Uhr ab '
console.log(`"${reservation.note}"`)

reservation.note = 'x'.repeat(250)
console.log(reservation.note.length)
console.log(Object.keys(reservation).join(', '))
