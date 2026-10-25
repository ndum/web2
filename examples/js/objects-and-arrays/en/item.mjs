const item = {
  id: 3,
  name: 'Raclette oven',
  deposit: 30,
  tags: ['kitchen', 'winter'],
}

console.log(item.name, item['deposit'], item.tags[1])

item.available = true
console.log(Object.keys(item).join(', '))

console.log(item.owner?.name ?? 'association')
