// The shop is open on Wednesday from 17 to 19 and on Saturday from 10 to 13
function isOpen(day, hour) {
  if (day === 'wednesday') return hour >= 17 && hour < 19
  if (day === 'saturday') return hour >= 10 && hour < 13
  return false
}

console.log(isOpen('wednesday', 18), isOpen('wednesday', 19), isOpen('saturday', 10), isOpen('monday', 11))
