const item = { id: 2, name: 'Tent for four', deposit: 50, availableFrom: '2026-11-12' }

const glued = item.name + ', CHF ' + item.deposit
const line = `${item.name}, CHF ${item.deposit}`
console.log(line)
console.log(glued === line)

console.log(`${item.name}: ${item.availableFrom === null ? 'in' : 'on loan'}`)

const hours = `Wednesday 5 to 7 pm
Saturday 10 am to 1 pm`
console.log(hours)
