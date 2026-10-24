const opening = new Date('2026-11-04T16:00:00Z')

const time = new Intl.DateTimeFormat('en-US', { weekday: 'long', hour: 'numeric', minute: '2-digit', timeZone: 'Europe/Zurich' })
console.log(time.format(opening))
