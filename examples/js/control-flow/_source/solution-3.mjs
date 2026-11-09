// [%Drei Eingaben aus dem Formularfeld für die Tage|Three entries from the form field for the days%]
const entries = ['4', '11', '[%vier|four%]']

for (const entry of entries) {
  const days = Number(entry)
  if (Number.isNaN(days)) {
    console.log(entry, '[%ist keine Zahl|is not a number%]')
  } else if (days > 7) {
    console.log(entry, '[%Tage sind zu lang|days are too long%]')
  } else {
    console.log(entry, '[%Tage sind erlaubt|days are allowed%]')
  }
}
