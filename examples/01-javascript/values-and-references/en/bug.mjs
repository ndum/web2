const items = []

// The volunteer's function adds a thing as often as the association owns it
function addCopies(items, thing, count) {
  for (let copy = 0; copy < count; copy += 1) {
    thing.id = items.length + 1
    items.push(thing)
  }
}

addCopies(items, { name: 'Tent for four', availableFrom: null }, 2)
items[0].availableFrom = '2026-11-14'

console.log(items[1].availableFrom, items[0] === items[1])
console.log(items[0].id, items[1].id)
