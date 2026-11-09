// from step 3
const isIn = (item) => item.availableFrom === null

const text = '{"id": 6, "name": "Projector", "deposit": 80, "availableFrom": null}'
const item = JSON.parse(text)

// The ladder has a deposit of CHF 20
console.log(item.name, isIn(item) ? 'in' : 'on loan', item.deposit + 20)
