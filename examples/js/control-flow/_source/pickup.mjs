// [%Die Festbankgarnitur ist ausgeliehen und ab dem 3. November wieder da|The beer bench set is on loan and back from November 3%]
const name = '[%Festbankgarnitur|Beer bench set%]'
const availableFrom = '2026-11-03'
// [%Ein Mitglied will sie am Samstag, 7. November abholen|A member wants to pick it up on Saturday, November 7%]
const pickup = '2026-11-07'

if (availableFrom === null) {
  console.log(name, '[%ist da|is in%]')
} else if (availableFrom <= pickup) {
  console.log(name, '[%ist bis zur Abholung zurück|is back in time for the pickup%]')
} else {
  console.log(name, '[%ist bei der Abholung noch ausgeliehen|is still on loan at the pickup%]')
}
