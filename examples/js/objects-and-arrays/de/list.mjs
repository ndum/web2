const names = ['Bohrmaschine', 'Zelt']
names.push('Leiter')

console.log(names.length, names.includes('Zelt'), names.indexOf('Leiter'))

const [first, ...rest] = names
console.log(first, rest)

const { name, deposit = 20 } = { name: 'Stichsäge' }
console.log(name, deposit)
