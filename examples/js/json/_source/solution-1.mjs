// [%aus Schritt 3|from step 3%]
const isIn = (item) => item.availableFrom === null

const text = '{"id": 6, "name": "[%Beamer|Projector%]", "deposit": 80, "availableFrom": null}'
const item = JSON.parse(text)

// [%Die Leiter kostet CHF 20 Pfand|The ladder has a deposit of CHF 20%]
console.log(item.name, isIn(item) ? '[%da|in%]' : '[%ausgeliehen|on loan%]', item.deposit + 20)
