// aus Schritt 3
const isIn = (item) => item.availableFrom === null

const text = '{"id": 6, "name": "Beamer", "deposit": 80, "availableFrom": null}'
const item = JSON.parse(text)

// Die Leiter kostet CHF 20 Pfand
console.log(item.name, isIn(item) ? 'da' : 'ausgeliehen', item.deposit + 20)
