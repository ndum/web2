const week = [
  'Monday', 'Tuesday', 'Wednesday', 'Thursday',
  'Friday', 'Saturday', 'Sunday',
]

for (const day of week) {
  switch (day) {
    case 'Wednesday':
      console.log(day, '5 to 7 p.m.')
      break
    case 'Saturday':
      console.log(day, '10 a.m. to 1 p.m.')
      break
    default:
      console.log(day, 'closed')
  }
}
