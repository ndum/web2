// Drei Eingaben aus dem Formularfeld für die Tage
const entries = ['4', '11', 'vier']

for (const entry of entries) {
  const days = Number(entry)
  if (Number.isNaN(days)) {
    console.log(entry, 'ist keine Zahl')
  } else if (days > 7) {
    console.log(entry, 'Tage sind zu lang')
  } else {
    console.log(entry, 'Tage sind erlaubt')
  }
}
