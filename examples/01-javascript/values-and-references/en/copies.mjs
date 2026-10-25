const tent = { name: 'Tent', availableFrom: null, parts: ['Pegs', 'Poles'] }

const copy = { ...tent }
copy.availableFrom = '2026-11-14'
copy.parts.push('Tarp')
console.log(tent.availableFrom, tent.parts.length)

const deepCopy = structuredClone(tent)
deepCopy.parts.pop()
console.log(tent.parts.length, deepCopy.parts.length)
