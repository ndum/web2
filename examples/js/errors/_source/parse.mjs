function parseDeposit(text) {
  const value = Number(text)
  if (Number.isNaN(value) || value < 0) {
    throw new RangeError(`[%Ungültiges Pfand|Invalid deposit%] ${text}`)
  }
  return value
}

for (const text of ['20', '-5', '[%zwanzig|twenty%]']) {
  try {
    console.log(parseDeposit(text))
  } catch (error) {
    console.log(error.name, error.message)
  } finally {
    console.log('[%geprüft|checked%]', text)
  }
}
