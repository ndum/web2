// aus Schritt 3
const loanDays = (from, to) => (Date.parse(to) - Date.parse(from)) / 86_400_000

// Abholen und Zurückbringen gehen am Mittwoch und am Samstag
const openDays = [3, 6]
const isOpenOn = (date) => openDays.includes(new Date(date).getUTCDay())

// Der Beamer ist schon vom 7. bis 11. November reserviert
const reservations = [{ itemId: 6, from: '2026-11-07', to: '2026-11-11' }]

function checkRequest(request) {
  if (!isOpenOn(request.from) || !isOpenOn(request.to)) {
    throw new Error('Abholen und Zurückbringen gehen nur am Mittwoch oder Samstag')
  }
  if (loanDays(request.from, request.to) > 7) {
    throw new Error('Eine Ausleihe dauert höchstens sieben Tage')
  }
  for (const other of reservations) {
    // Wer am Rückgabetag abholt, kommt niemandem in die Quere
    if (other.itemId === request.itemId && request.from < other.to && other.from < request.to) {
      throw new Error('Das Ding ist dann schon reserviert')
    }
  }
}

const requests = [
  { itemId: 6, from: '2026-11-11', to: '2026-11-14' },
  { itemId: 6, from: '2026-11-07', to: '2026-11-11' },
  { itemId: 1, from: '2026-11-09', to: '2026-11-11' },
  { itemId: 3, from: '2026-11-07', to: '2026-11-18' },
]

for (const request of requests) {
  try {
    checkRequest(request)
    console.log(request.from, 'bis', request.to, 'angenommen')
  } catch (error) {
    console.log(request.from, 'bis', request.to, 'abgelehnt:', error.message)
  }
}
