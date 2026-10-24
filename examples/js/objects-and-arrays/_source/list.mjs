const names = ['[%Bohrmaschine|Drill%]', '[%Zelt|Tent%]']
names.push('[%Leiter|Ladder%]')

console.log(names.length, names.includes('[%Zelt|Tent%]'), names.indexOf('[%Leiter|Ladder%]'))

const [first, ...rest] = names
console.log(first, rest)

const { name, deposit = 20 } = { name: '[%Stichsäge|Jigsaw%]' }
console.log(name, deposit)
