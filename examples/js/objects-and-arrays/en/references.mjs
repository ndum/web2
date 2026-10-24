const tent = { name: 'Tent', available: true }
const sameTent = tent
sameTent.available = false
console.log(tent.available)

const copy = { ...tent, available: true }
console.log(tent.available, copy.available)
console.log({ deposit: 20 } === { deposit: 20 }, tent === sameTent)

const names = ['Tent']
const more = [...names, 'Projector']
console.log(names.length, more.length)
