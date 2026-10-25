const items = [
  { id: 1, name: '[%Bohrmaschine|Drill%]', category: '[%Werkzeug|Tools%]', deposit: 20, availableFrom: null },
  { id: 2, name: '[%Zelt für vier Personen|Tent for four%]', category: '[%Camping|Camping%]', deposit: 50, availableFrom: '2026-11-12' },
  { id: 5, name: '[%Stichsäge|Jigsaw%]', category: '[%Werkzeug|Tools%]', deposit: 20, availableFrom: null },
  { id: 11, name: '[%Akkuschrauber|Cordless screwdriver%]', category: '[%Werkzeug|Tools%]', deposit: 20, availableFrom: '2026-11-05' },
]

const ids = items.map((item) => item.id)
console.log(ids)

const available = items.filter((item) => item.availableFrom === null)
console.log(available.length)

const toolsThatAreIn = items
  .filter((item) => item.category === '[%Werkzeug|Tools%]' && item.availableFrom === null)
  .map((item) => item.name)
console.log(toolsThatAreIn)
