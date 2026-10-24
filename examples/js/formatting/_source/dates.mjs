const date = new Date('2026-11-12T00:00:00Z')

console.log(date.toLocaleDateString('[%de-CH|en-US%]', { timeZone: 'UTC' }))

const long = new Intl.DateTimeFormat('[%de-CH|en-US%]', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'UTC' })
console.log(long.format(date))

const relative = new Intl.RelativeTimeFormat('[%de-CH|en-US%]', { numeric: 'auto' })
console.log(relative.format(-1, 'day'), relative.format(3, 'day'))
