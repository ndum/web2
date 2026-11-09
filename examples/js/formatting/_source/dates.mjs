// [%Eine Anfrage holt am Samstag, 7. November 2026, ab|A request picks up on Saturday, November 7, 2026%]
const pickup = new Date('2026-11-07')

console.log(pickup.toLocaleDateString('[%de-CH|en-US%]', { timeZone: 'UTC' }))

const long = new Intl.DateTimeFormat('[%de-CH|en-US%]', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })
console.log(long.format(pickup))

// [%Der Tresen-Helfer arbeitet am Samstag, 31. Oktober 2026|The counter helper works on Saturday, October 31, 2026%]
const days = (Date.parse('2026-11-07') - Date.parse('2026-10-31')) / 86_400_000
const relative = new Intl.RelativeTimeFormat('[%de-CH|en-US%]', { numeric: 'auto' })
console.log(relative.format(days, 'day'), relative.format(1, 'week'), relative.format(1, 'day'))
