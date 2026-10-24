function forEachItem(items, callback) {
  for (const item of items) callback(item)
}

const items = [{ name: '[%Bohrmaschine|Drill%]' }, { name: '[%Leiter|Ladder%]' }]

forEachItem(items, (item) => console.log(item.name))
items.forEach((item, index) => console.log(index, item.name))
