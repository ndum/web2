function parseDays(text) {
  const days = Number(text)
  if (!Number.isInteger(days) || days < 1 || days > 7) {
    throw new RangeError(`[%Eine Ausleihe dauert 1 bis 7 Tage, nicht|A loan lasts 1 to 7 days, not%] ${text}`)
  }
  return days
}

for (const text of ['3', '9', '2.5']) {
  try {
    console.log(parseDays(text))
  } catch (error) {
    console.log(error.message)
  }
}
