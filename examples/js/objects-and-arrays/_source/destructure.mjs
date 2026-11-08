const items = [
  { id: 1, name: '[%Bohrmaschine|Drill%]', deposit: 20, availableFrom: null },
  { id: 2, name: '[%Zelt für vier Personen|Tent for four%]', deposit: 50, availableFrom: '2026-11-12' },
  { id: 3, name: '[%Raclette-Ofen|Raclette oven%]', deposit: 30, availableFrom: null },
]

const [first, ...rest] = items
console.log(first.name, rest.length)

const { name, availableFrom, category = '[%ohne Kategorie|no category%]' } = items[1]
console.log(name, availableFrom, category)

console.log(items[1].owner?.name ?? '[%Verein|association%]')
