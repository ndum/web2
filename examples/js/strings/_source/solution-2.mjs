function receiptLine(label, amount) {
  return `${label.padEnd(16, '.')} CHF ${amount.toFixed(2).padStart(6)}`
}

const projector = { id: 6, name: '[%Beamer|Projector%]', deposit: 80, availableFrom: null }
const oven = { id: 3, name: '[%Raclette-Ofen|Raclette oven%]', deposit: 30, availableFrom: null }

console.log(receiptLine(projector.name, projector.deposit))
console.log(receiptLine(oven.name, oven.deposit))
console.log(receiptLine('Total', projector.deposit + oven.deposit))
