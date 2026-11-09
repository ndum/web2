// Die Festbankgarnitur ist ausgeliehen und ab dem 3. November wieder da
const name = 'Festbankgarnitur'
const availableFrom = '2026-11-03'
// Ein Mitglied will sie am Samstag, 7. November abholen
const pickup = '2026-11-07'

if (availableFrom === null) {
  console.log(name, 'ist da')
} else if (availableFrom <= pickup) {
  console.log(name, 'ist bis zur Abholung zurück')
} else {
  console.log(name, 'ist bei der Abholung noch ausgeliehen')
}
