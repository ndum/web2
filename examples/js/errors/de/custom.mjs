class NotAvailableError extends Error {
  constructor(item) {
    super(`${item.name} ist ausgeliehen`)
    this.name = 'NotAvailableError'
    this.item = item
  }
}

function handOut(item) {
  if (item.availableFrom !== null) throw new NotAvailableError(item)
  return `${item.name} ausgegeben`
}

const drill = { id: 1, name: 'Bohrmaschine', deposit: 20, availableFrom: null }
const tent = { id: 2, name: 'Zelt für vier Personen', deposit: 50, availableFrom: '2026-11-12' }

for (const item of [drill, tent]) {
  try {
    console.log(handOut(item))
  } catch (error) {
    // Nur den bekannten Fehler behandeln, jeden anderen weiterwerfen
    if (!(error instanceof NotAvailableError)) throw error
    console.log(error.name)
    console.log(`${error.message}, wieder da ab ${error.item.availableFrom}`)
  }
}
