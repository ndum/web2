const loanDays = (from, to) => (Date.parse(to) - Date.parse(from)) / 86_400_000

const openDays = [3, 6]
const isOpenOn = (date) => openDays.includes(new Date(date).getUTCDay())

const reservations = [{ itemId: 6, from: '2026-11-07', to: '2026-11-11' }]

function checkRequest(request) {
  if (!isOpenOn(request.from) || !isOpenOn(request.to)) {
    throw new Error('Abholen und Zurückbringen gehen nur am Mittwoch oder Samstag')
  }
  // Vertauschte Daten ergäben weniger als null Tage und kämen sonst durch
  if (request.to < request.from) {
    throw new Error('Das Zurückbringen liegt vor dem Abholen')
  }
  if (loanDays(request.from, request.to) > 7) {
    throw new Error('Eine Ausleihe dauert höchstens sieben Tage')
  }
  for (const other of reservations) {
    if (other.itemId === request.itemId && request.from < other.to && other.from < request.to) {
      throw new Error('Das Ding ist dann schon reserviert')
    }
  }
}

const requests = [
  { itemId: 1, from: '2026-11-14', to: '2026-11-11' },
  { itemId: 1, from: '2026-11-11', to: '2026-11-14' },
]

for (const request of requests) {
  try {
    checkRequest(request)
    console.log(request.from, 'bis', request.to, 'angenommen')
  } catch (error) {
    console.log(request.from, 'bis', request.to, 'abgelehnt:', error.message)
  }
}
