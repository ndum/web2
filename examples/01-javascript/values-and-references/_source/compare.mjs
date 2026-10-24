const first = { id: 2, name: '[%Zelt|Tent%]' }
const second = { id: 2, name: '[%Zelt|Tent%]' }

console.log(first === second, first.id === second.id)
console.log([1, 2] === [1, 2], '[%Zelt|Tent%]' === '[%Zelt|Tent%]')
console.log(JSON.stringify(first) === JSON.stringify(second))
