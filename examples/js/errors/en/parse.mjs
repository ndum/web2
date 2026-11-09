// The deposit of a thing lies between 10 and 80 francs
function parseDeposit(text) {
  const deposit = Number(text)
  if (!Number.isInteger(deposit) || deposit < 10 || deposit > 80) {
    throw new RangeError(`Deposit between 10 and 80 francs, not ${text}`)
  }
  return deposit
}

for (const text of ['40', '5', 'forty']) {
  try {
    console.log(parseDeposit(text))
  } catch (error) {
    console.log(error.name, error.message)
  } finally {
    console.log('checked', text)
  }
}
