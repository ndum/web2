// The days from a Wednesday to the next Wednesday
const days = [
  'Wednesday', 'Thursday', 'Friday', 'Saturday',
  'Sunday', 'Monday', 'Tuesday', 'Wednesday',
]

let ahead = 1
while (days[ahead] !== 'Wednesday' && days[ahead] !== 'Saturday') {
  ahead += 1
}
console.log('Next open day:', days[ahead], 'in', ahead, 'days')
