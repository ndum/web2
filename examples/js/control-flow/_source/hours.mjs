// [%Der Tresen-Helfer arbeitet an einem Samstag|The counter helper works on a Saturday%]
const day = '[%Samstag|Saturday%]'
let hours

switch (day) {
  case '[%Mittwoch|Wednesday%]':
    hours = '[%17 bis 19 Uhr|5 to 7 p.m.%]'
    break
  case '[%Samstag|Saturday%]':
    hours = '[%10 bis 13 Uhr|10 a.m. to 1 p.m.%]'
    break
  default:
    hours = '[%geschlossen|closed%]'
}
console.log(day, hours)
