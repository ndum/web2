const name = '[%Zelt für vier Personen|Tent for four%]'
const query = '[%zelt |tent %]'

console.log(name.includes(query))
console.log(name.includes(query.trim()))
console.log(name.toLowerCase().includes(query.trim().toLowerCase()))
