class ReservedError extends Error {
  constructor(until) {
    super('Das Ding ist dann schon reserviert')
    this.name = 'ReservedError'
    this.until = until
  }
}

const reservations = [{ itemId: 6, from: '2026-11-07', to: '2026-11-11' }]

function checkFree(request) {
  for (const other of reservations) {
    if (other.itemId === request.itemId && request.from < other.to && other.from < request.to) {
      // Am Rückgabetag darf das nächste Mitglied abholen, darum ist das Ding ab dann frei
      throw new ReservedError(other.to)
    }
  }
}

const requests = [
  { itemId: 6, from: '2026-11-07', to: '2026-11-11' },
  { itemId: 6, from: '2026-11-11', to: '2026-11-14' },
]

for (const request of requests) {
  try {
    checkFree(request)
    console.log(request.from, 'frei')
  } catch (error) {
    if (!(error instanceof ReservedError)) throw error
    console.log(request.from, 'reserviert, frei ab', error.until)
  }
}
