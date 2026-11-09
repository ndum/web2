// Der Tresen-Helfer arbeitet an einem Samstag
const day = 'Samstag'
let hours

switch (day) {
  case 'Mittwoch':
    hours = '17 bis 19 Uhr'
    break
  case 'Samstag':
    hours = '10 bis 13 Uhr'
    break
  default:
    hours = 'geschlossen'
}
console.log(day, hours)
