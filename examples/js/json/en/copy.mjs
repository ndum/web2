const tent = {
  id: 2,
  name: 'Tent for four',
  availableFrom: new Date('2026-11-12'),
  parts: ['pegs', 'poles'],
}

const spread = { ...tent }
const clone = structuredClone(tent)
const viaJson = JSON.parse(JSON.stringify(tent))

spread.parts.push('tarp')
console.log(tent.parts.length, clone.parts.length, viaJson.parts.length)
console.log(clone.availableFrom instanceof Date, viaJson.availableFrom instanceof Date)
