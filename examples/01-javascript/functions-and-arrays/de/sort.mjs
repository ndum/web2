const items = [
  { name: 'Stichsäge', deposit: 20 },
  { name: 'Zelt für vier Personen', deposit: 50 },
  { name: 'Akkuschrauber', deposit: 20 },
  { name: 'Beamer', deposit: 80 },
]

const byName = items.toSorted((a, b) => a.name.localeCompare(b.name, 'de-CH'))
console.log(byName.map((item) => item.name))

const byDeposit = items.toSorted((a, b) => b.deposit - a.deposit)
console.log(byDeposit.map((item) => item.deposit))
console.log(items[0].name)
