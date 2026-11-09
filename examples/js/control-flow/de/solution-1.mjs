const week = [
  'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag',
  'Freitag', 'Samstag', 'Sonntag',
]

for (const day of week) {
  switch (day) {
    case 'Mittwoch':
      console.log(day, '17 bis 19 Uhr')
      break
    case 'Samstag':
      console.log(day, '10 bis 13 Uhr')
      break
    default:
      console.log(day, 'geschlossen')
  }
}
