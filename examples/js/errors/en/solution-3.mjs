class ReservedError extends Error {
  constructor(until) {
    super('The thing is already reserved then')
    this.name = 'ReservedError'
    this.until = until
  }
}

const reservations = [{ itemId: 6, from: '2026-11-07', to: '2026-11-11' }]

function checkFree(request) {
  for (const other of reservations) {
    if (other.itemId === request.itemId && request.from < other.to && other.from < request.to) {
      // The next member may pick up on the return day, so the thing is free from then on
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
    console.log(request.from, 'free')
  } catch (error) {
    if (!(error instanceof ReservedError)) throw error
    console.log(request.from, 'reserved, free from', error.until)
  }
}
