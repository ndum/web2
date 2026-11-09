class NotAvailableError extends Error {
  constructor(item) {
    super(`${item.name} [%ist ausgeliehen|is on loan%]`)
    this.name = 'NotAvailableError'
    this.item = item
  }
}

function handOut(item) {
  if (item.availableFrom !== null) throw new NotAvailableError(item)
  return `${item.name} [%ausgegeben|handed out%]`
}

const drill = { id: 1, name: '[%Bohrmaschine|Drill%]', deposit: 20, availableFrom: null }
const tent = { id: 2, name: '[%Zelt für vier Personen|Tent for four%]', deposit: 50, availableFrom: '2026-11-12' }

for (const item of [drill, tent]) {
  try {
    console.log(handOut(item))
  } catch (error) {
    // [%Nur den bekannten Fehler behandeln, jeden anderen weiterwerfen|Handle only the known error and rethrow every other one%]
    if (!(error instanceof NotAvailableError)) throw error
    console.log(error.name)
    console.log(`${error.message}, [%wieder da ab|back on%] ${error.item.availableFrom}`)
  }
}
