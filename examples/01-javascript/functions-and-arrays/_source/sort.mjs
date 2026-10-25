const items = [
  { name: '[%Stichsäge|Jigsaw%]', deposit: 20 },
  { name: '[%Zelt für vier Personen|Tent for four%]', deposit: 50 },
  { name: '[%Akkuschrauber|Cordless screwdriver%]', deposit: 20 },
  { name: '[%Beamer|Projector%]', deposit: 80 },
]

const byName = items.toSorted((a, b) => a.name.localeCompare(b.name, '[%de-CH|en-US%]'))
console.log(byName.map((item) => item.name))

const byDeposit = items.toSorted((a, b) => b.deposit - a.deposit)
console.log(byDeposit.map((item) => item.deposit))
console.log(items[0].name)
