const names = ['Zelt', 'Äxte', 'Bohrmaschine']

console.log([...names].sort())
console.log([...names].sort((a, b) => a.localeCompare(b, 'de-CH')))
