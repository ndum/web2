const reservation = { item: { name: 'Beamer' }, from: '2026-11-07' }

const { item: { name }, to = reservation.from, note } = reservation
console.log(name, to, note)
console.log(reservation.member?.email ?? 'keine E-Mail')
