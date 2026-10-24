const reservation = { item: { name: 'Projector' }, from: '2026-11-07' }

const { item: { name }, to = reservation.from, note } = reservation
console.log(name, to, note)
console.log(reservation.member?.email ?? 'no e-mail')
