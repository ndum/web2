const first = { id: 2, name: 'Zelt' }
const second = { id: 2, name: 'Zelt' }

console.log(first === second, first.id === second.id)
console.log([1, 2] === [1, 2], 'Zelt' === 'Zelt')
console.log(JSON.stringify(first) === JSON.stringify(second))
