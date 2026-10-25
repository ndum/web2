let count = 3
let copy = count
copy += 1
console.log(count, copy)

const tent = { name: '[%Zelt für vier Personen|Tent for four%]', availableFrom: null }
const sameTent = tent
sameTent.availableFrom = '2026-11-14'
console.log(tent.availableFrom, tent === sameTent)
