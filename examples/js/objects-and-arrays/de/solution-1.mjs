const items = [
  { id: 1, name: 'Bohrmaschine', deposit: 20, availableFrom: null },
  { id: 2, name: 'Zelt für vier Personen', deposit: 50, availableFrom: '2026-11-12' },
  { id: 3, name: 'Raclette-Ofen', deposit: 30, availableFrom: null },
  { id: 4, name: 'Festbankgarnitur', deposit: 40, availableFrom: '2026-11-03' },
  { id: 5, name: 'Stichsäge', deposit: 20, availableFrom: null },
  { id: 6, name: 'Beamer', deposit: 80, availableFrom: null },
  { id: 7, name: 'Leiter', deposit: 20, availableFrom: null },
  { id: 8, name: 'Schlafsack', deposit: 20, availableFrom: null },
  { id: 9, name: 'Velo-Anhänger', deposit: 60, availableFrom: '2026-11-12' },
]

items.push({ id: 10, name: 'Rasenmäher', deposit: 40, availableFrom: null })
console.log(items.length, items[items.length - 1].name)
