const francs = 0.1 + 0.2
console.log(francs, francs === 0.3)

// Amounts in Rappen are whole numbers, and whole numbers add up exactly
const rappen = 10 + 20
console.log(rappen, rappen === 30, (rappen / 100).toFixed(2))
