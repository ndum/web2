const item = { id: 2, name: '[%Zelt für vier Personen|Tent for four%]', deposit: 50, availableFrom: '2026-11-12' }

const glued = item.name + ', CHF ' + item.deposit
const line = `${item.name}, CHF ${item.deposit}`
console.log(line)
console.log(glued === line)

console.log(`${item.name}: ${item.availableFrom === null ? '[%da|in%]' : '[%ausgeliehen|on loan%]'}`)

const hours = `[%Mittwoch 17 bis 19 Uhr|Wednesday 5 to 7 pm%]
[%Samstag 10 bis 13 Uhr|Saturday 10 am to 1 pm%]`
console.log(hours)
