const ids = [9, 10, 2, 12]
console.log(ids.toSorted().join(', '))
console.log(ids.toSorted((a, b) => a - b).join(', '))
console.log(ids.join(', '))

const names = ['Bike trailer', 'Lawn mower', 'Tent for four', 'Sander']
names.sort((a, b) => a.localeCompare(b, 'en-US'))
console.log(names.join(', '))
