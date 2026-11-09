// The eight days from today, Saturday, October 31, to the next Saturday
const days = [
  'Saturday', 'Sunday', 'Monday', 'Tuesday',
  'Wednesday', 'Thursday', 'Friday', 'Saturday',
]

// Today does not count, so the search starts at 1
for (let ahead = 1; ahead < days.length; ahead++) {
  const day = days[ahead]
  if (day !== 'Wednesday' && day !== 'Saturday') continue
  console.log('Next open day:', day, 'in', ahead, 'days')
  break
}
