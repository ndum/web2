const tent = { name: '[%Zelt|Tent%]', available: true }
const sameTent = tent
sameTent.available = false
console.log(tent.available)

const copy = { ...tent, available: true }
console.log(tent.available, copy.available)
console.log({ deposit: 20 } === { deposit: 20 }, tent === sameTent)

const names = ['[%Zelt|Tent%]']
const more = [...names, '[%Beamer|Projector%]']
console.log(names.length, more.length)
