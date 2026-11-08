const item = { id: 3, name: 'Raclette oven', deposit: 30, availableFrom: null }
console.log(item.name, item.deposit)

const field = 'availableFrom'
console.log(field, item[field])

item.category = 'Kitchen'
console.log(Object.keys(item).join(', '))
