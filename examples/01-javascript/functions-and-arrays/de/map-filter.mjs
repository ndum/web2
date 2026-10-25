const items = [
  { id: 1, name: 'Bohrmaschine', category: 'Werkzeug', deposit: 20, availableFrom: null },
  { id: 2, name: 'Zelt für vier Personen', category: 'Camping', deposit: 50, availableFrom: '2026-11-12' },
  { id: 5, name: 'Stichsäge', category: 'Werkzeug', deposit: 20, availableFrom: null },
  { id: 11, name: 'Akkuschrauber', category: 'Werkzeug', deposit: 20, availableFrom: '2026-11-05' },
]

const ids = items.map((item) => item.id)
console.log(ids)

const available = items.filter((item) => item.availableFrom === null)
console.log(available.length)

const toolsThatAreIn = items
  .filter((item) => item.category === 'Werkzeug' && item.availableFrom === null)
  .map((item) => item.name)
console.log(toolsThatAreIn)
