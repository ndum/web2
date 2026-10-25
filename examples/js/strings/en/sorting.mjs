const names = ['tent', 'Drill', 'axe']

console.log([...names].sort())
console.log([...names].sort((a, b) => a.localeCompare(b, 'en-US')))
