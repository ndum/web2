const tent = { name: '[%Zelt|Tent%]', availableFrom: null, parts: ['[%Heringe|Pegs%]', '[%Gestänge|Poles%]'] }

const copy = { ...tent }
copy.availableFrom = '2026-11-14'
copy.parts.push('[%Plane|Tarp%]')
console.log(tent.availableFrom, tent.parts.length)

const deepCopy = structuredClone(tent)
deepCopy.parts.pop()
console.log(tent.parts.length, deepCopy.parts.length)
