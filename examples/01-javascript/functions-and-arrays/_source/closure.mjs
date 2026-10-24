// Returns a function that remembers the category it was made for
function byCategory(category) {
  return (item) => item.category === category
}

const items = [
  { name: '[%Bohrmaschine|Drill%]', category: '[%Werkzeug|Tools%]' },
  { name: '[%Zelt für vier Personen|Tent for four%]', category: '[%Camping|Camping%]' },
  { name: '[%Stichsäge|Jigsaw%]', category: '[%Werkzeug|Tools%]' },
]

const isTool = byCategory('[%Werkzeug|Tools%]')
console.log(items.filter(isTool).length, items.filter(byCategory('[%Camping|Camping%]')).length)
