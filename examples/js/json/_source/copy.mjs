const original = { name: '[%Zelt|Tent%]', from: new Date('2026-11-02T00:00:00Z'), parts: ['[%Heringe|pegs%]'] }

const viaJson = JSON.parse(JSON.stringify(original))
const viaClone = structuredClone(original)

viaClone.parts.push('[%Plane|tarp%]')
console.log(original.parts.length, viaClone.parts.length)
console.log(viaJson.from instanceof Date, viaClone.from instanceof Date)

try {
  JSON.parse("{ 'name': 'Zelt' }")
} catch (error) {
  console.log(error.name)
}
