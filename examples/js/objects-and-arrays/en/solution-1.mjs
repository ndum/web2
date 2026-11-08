const items = [
  { id: 1, name: 'Drill', deposit: 20, availableFrom: null },
  { id: 2, name: 'Tent for four', deposit: 50, availableFrom: '2026-11-12' },
  { id: 3, name: 'Raclette oven', deposit: 30, availableFrom: null },
  { id: 4, name: 'Beer bench set', deposit: 40, availableFrom: '2026-11-03' },
  { id: 5, name: 'Jigsaw', deposit: 20, availableFrom: null },
  { id: 6, name: 'Projector', deposit: 80, availableFrom: null },
  { id: 7, name: 'Ladder', deposit: 20, availableFrom: null },
  { id: 8, name: 'Sleeping bag', deposit: 20, availableFrom: null },
  { id: 9, name: 'Bike trailer', deposit: 60, availableFrom: '2026-11-12' },
]

items.push({ id: 10, name: 'Lawn mower', deposit: 40, availableFrom: null })
console.log(items.length, items[items.length - 1].name)
