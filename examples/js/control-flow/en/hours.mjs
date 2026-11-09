// The counter helper works on a Saturday
const day = 'Saturday'
let hours

switch (day) {
  case 'Wednesday':
    hours = '5 to 7 p.m.'
    break
  case 'Saturday':
    hours = '10 a.m. to 1 p.m.'
    break
  default:
    hours = 'closed'
}
console.log(day, hours)
