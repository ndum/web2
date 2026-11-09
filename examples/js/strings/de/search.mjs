const name = 'Zelt für vier Personen'
const query = 'zelt '

console.log(name.includes(query))
console.log(name.includes(query.trim()))
console.log(name.toLowerCase().includes(query.trim().toLowerCase()))
