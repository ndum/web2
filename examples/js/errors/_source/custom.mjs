class NotAvailableError extends Error {
  constructor(item) {
    super(`${item} [%ist ausgeliehen|is on loan%]`)
    this.name = 'NotAvailableError'
    this.item = item
  }
}

function reserve(item, available) {
  if (!available) throw new NotAvailableError(item)
  return `${item} [%reserviert|reserved%]`
}

try {
  console.log(reserve('[%Bohrmaschine|Drill%]', true))
  console.log(reserve('[%Zelt|Tent%]', false))
} catch (error) {
  if (error instanceof NotAvailableError) console.log(error.message)
  else throw error
}
