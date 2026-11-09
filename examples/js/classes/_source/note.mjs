class Reservation {
  #note = ''

  constructor(number, member) {
    this.number = number
    this.member = member
  }

  get note() {
    return this.#note
  }

  // [%Jede Notiz läuft durch den Setter, so hat sie nie mehr als 200 Zeichen|Every note passes the setter, so it never has more than 200 characters%]
  set note(text) {
    this.#note = text.trim().slice(0, 200)
  }
}

const reservation = new Reservation('R-1', 'M-117')
reservation.note = '  [%Holt den Beamer um 11 Uhr ab|Picks up the projector at 11 am%] '
console.log(`"${reservation.note}"`)

reservation.note = 'x'.repeat(250)
console.log(reservation.note.length)
console.log(Object.keys(reservation).join(', '))
