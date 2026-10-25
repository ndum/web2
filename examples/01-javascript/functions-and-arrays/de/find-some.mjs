const items = [
  { id: 1, name: 'Bohrmaschine', category: 'Werkzeug', deposit: 20, availableFrom: null },
  { id: 2, name: 'Zelt für vier Personen', category: 'Camping', deposit: 50, availableFrom: '2026-11-12' },
  { id: 5, name: 'Stichsäge', category: 'Werkzeug', deposit: 20, availableFrom: null },
  { id: 11, name: 'Akkuschrauber', category: 'Werkzeug', deposit: 20, availableFrom: '2026-11-05' },
]

const tent = items.find((item) => item.id === 2)
console.log(tent.name, items.findIndex((item) => item.id === 2))
console.log(items.find((item) => item.id === 99))
console.log(items.some((item) => item.deposit > 40), items.every((item) => item.deposit >= 20))
