const names = ['Drill', 'Tent']
names.push('Ladder')

console.log(names.length, names.includes('Tent'), names.indexOf('Ladder'))

const [first, ...rest] = names
console.log(first, rest)

const { name, deposit = 20 } = { name: 'Jigsaw' }
console.log(name, deposit)
