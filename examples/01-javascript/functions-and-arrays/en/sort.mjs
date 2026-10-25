const items = [
  { name: 'Jigsaw', deposit: 20 },
  { name: 'Tent for four', deposit: 50 },
  { name: 'Cordless screwdriver', deposit: 20 },
  { name: 'Projector', deposit: 80 },
]

const byName = items.toSorted((a, b) => a.name.localeCompare(b.name, 'en-US'))
console.log(byName.map((item) => item.name))

const byDeposit = items.toSorted((a, b) => b.deposit - a.deposit)
console.log(byDeposit.map((item) => item.deposit))
console.log(items[0].name)
