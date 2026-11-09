const tent = {
  id: 2,
  name: 'Zelt für vier Personen',
  availableFrom: new Date('2026-11-12'),
  parts: ['Heringe', 'Stangen'],
}

const spread = { ...tent }
const clone = structuredClone(tent)
const viaJson = JSON.parse(JSON.stringify(tent))

spread.parts.push('Plane')
console.log(tent.parts.length, clone.parts.length, viaJson.parts.length)
console.log(clone.availableFrom instanceof Date, viaJson.availableFrom instanceof Date)
