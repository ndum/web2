class NotAvailableError extends Error {
  constructor(item) {
    super(`${item.name} is on loan`)
    this.name = 'NotAvailableError'
    this.item = item
  }
}

function handOut(item) {
  if (item.availableFrom !== null) throw new NotAvailableError(item)
  return `${item.name} handed out`
}

const drill = { id: 1, name: 'Drill', deposit: 20, availableFrom: null }
const tent = { id: 2, name: 'Tent for four', deposit: 50, availableFrom: '2026-11-12' }

for (const item of [drill, tent]) {
  try {
    console.log(handOut(item))
  } catch (error) {
    // Handle only the known error and rethrow every other one
    if (!(error instanceof NotAvailableError)) throw error
    console.log(error.name)
    console.log(`${error.message}, back on ${error.item.availableFrom}`)
  }
}
