// Three entries from the form field for the days
const entries = ['4', '11', 'four']

for (const entry of entries) {
  const days = Number(entry)
  if (Number.isNaN(days)) {
    console.log(entry, 'is not a number')
  } else if (days > 7) {
    console.log(entry, 'days are too long')
  } else {
    console.log(entry, 'days are allowed')
  }
}
