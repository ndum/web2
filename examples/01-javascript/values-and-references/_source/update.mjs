const items = [
  { id: 1, name: '[%Bohrmaschine|Drill%]', availableFrom: null },
  { id: 2, name: '[%Zelt für vier Personen|Tent for four%]', availableFrom: null },
]

// Returns a new list, only the lent thing is a new object, the original stays as it was
function lend(items, id, until) {
  return items.map((item) => (item.id === id ? { ...item, availableFrom: until } : item))
}

const after = lend(items, 2, '2026-11-14')
console.log(items[1].availableFrom, after[1].availableFrom)
console.log(after === items, after[0] === items[0], after[1] === items[1])
