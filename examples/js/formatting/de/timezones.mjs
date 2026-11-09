// Ein Datum ohne Uhrzeit liest JavaScript als Mitternacht in UTC
const date = new Date('2026-11-12')
console.log(date.toISOString())

const format = (timeZone) => date.toLocaleDateString('de-CH', { timeZone })
console.log(format('UTC'), format('Europe/Zurich'), format('America/New_York'))

// Der Laden öffnet am Samstag, 7. November, um 10 Uhr in Bern, in UTC ist es dann 9 Uhr
const opening = new Date('2026-11-07T09:00:00Z')
console.log(opening.toLocaleTimeString('de-CH', { hour: 'numeric', minute: '2-digit', timeZone: 'Europe/Zurich' }))
