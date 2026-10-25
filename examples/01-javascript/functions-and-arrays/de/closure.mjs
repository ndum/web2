// Returns a function that remembers the category it was made for
function byCategory(category) {
  return (item) => item.category === category
}

const items = [
  { name: 'Bohrmaschine', category: 'Werkzeug' },
  { name: 'Zelt für vier Personen', category: 'Camping' },
  { name: 'Stichsäge', category: 'Werkzeug' },
]

const isTool = byCategory('Werkzeug')
console.log(items.filter(isTool).length, items.filter(byCategory('Camping')).length)
