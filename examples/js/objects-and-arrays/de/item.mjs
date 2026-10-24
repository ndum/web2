const item = {
  id: 3,
  name: 'Raclette-Ofen',
  deposit: 30,
  tags: ['Küche', 'Winter'],
}

console.log(item.name, item['deposit'], item.tags[1])

item.available = true
console.log(Object.keys(item).join(', '))

console.log(item.owner?.name ?? 'Verein')
