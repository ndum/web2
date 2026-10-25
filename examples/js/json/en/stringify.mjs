const item = {
  id: 2,
  name: 'Tent',
  deposit: 50,
  lentUntil: new Date('2026-11-12T00:00:00Z'),
  note: undefined,
}

const text = JSON.stringify(item)
console.log(text)

const back = JSON.parse(text)
console.log(typeof back.lentUntil, back.note)

console.log(JSON.stringify({ tags: ['kitchen', 'raclette'] }, null, 2))
