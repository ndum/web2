const first = { id: 2, name: 'Tent' }
const second = { id: 2, name: 'Tent' }

console.log(first === second, first.id === second.id)
console.log([1, 2] === [1, 2], 'Tent' === 'Tent')
console.log(JSON.stringify(first) === JSON.stringify(second))
