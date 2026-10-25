class NotAvailableError extends Error {
  constructor(item) {
    super(`${item} is on loan`)
    this.name = 'NotAvailableError'
    this.item = item
  }
}

function reserve(item, available) {
  if (!available) throw new NotAvailableError(item)
  return `${item} reserved`
}

try {
  console.log(reserve('Drill', true))
  console.log(reserve('Tent', false))
} catch (error) {
  if (error instanceof NotAvailableError) console.log(error.message)
  else throw error
}
