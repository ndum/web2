// Returns a function that remembers the category it was made for
function byCategory(category) {
  return (item) => item.category === category
}

const items = [
  { name: 'Drill', category: 'Tools' },
  { name: 'Tent for four', category: 'Camping' },
  { name: 'Jigsaw', category: 'Tools' },
]

const isTool = byCategory('Tools')
console.log(items.filter(isTool).length, items.filter(byCategory('Camping')).length)
