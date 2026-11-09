// Das Pfand eines Dings liegt zwischen 10 und 80 Franken
function parseDeposit(text) {
  const deposit = Number(text)
  if (!Number.isInteger(deposit) || deposit < 10 || deposit > 80) {
    throw new RangeError(`Pfand zwischen 10 und 80 Franken, nicht ${text}`)
  }
  return deposit
}

for (const text of ['40', '5', 'vierzig']) {
  try {
    console.log(parseDeposit(text))
  } catch (error) {
    console.log(error.name, error.message)
  } finally {
    console.log('geprüft', text)
  }
}
