class NotAvailableError extends Error {
  constructor(item) {
    super(`${item} ist ausgeliehen`)
    this.name = 'NotAvailableError'
    this.item = item
  }
}

function reserve(item, available) {
  if (!available) throw new NotAvailableError(item)
  return `${item} reserviert`
}

try {
  console.log(reserve('Bohrmaschine', true))
  console.log(reserve('Zelt', false))
} catch (error) {
  if (error instanceof NotAvailableError) console.log(error.message)
  else throw error
}
