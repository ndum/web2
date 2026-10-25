function markAsLent(item) {
  item.availableFrom = '2026-11-14'
}

function shout(name) {
  name = name.toUpperCase()
}

const drill = { name: 'Bohrmaschine', availableFrom: null }
const name = drill.name
markAsLent(drill)
shout(name)
console.log(drill.availableFrom, name)
