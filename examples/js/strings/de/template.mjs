const item = { id: 2, name: 'Zelt für vier Personen', deposit: 50, availableFrom: '2026-11-12' }

const glued = item.name + ', CHF ' + item.deposit
const line = `${item.name}, CHF ${item.deposit}`
console.log(line)
console.log(glued === line)

console.log(`${item.name}: ${item.availableFrom === null ? 'da' : 'ausgeliehen'}`)

const hours = `Mittwoch 17 bis 19 Uhr
Samstag 10 bis 13 Uhr`
console.log(hours)
