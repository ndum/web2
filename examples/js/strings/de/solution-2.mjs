function receiptLine(name, deposit) {
  return `${name.padEnd(16, '.')} CHF ${deposit.toFixed(2).padStart(6)}`
}

console.log(receiptLine('Zelt', 50))
console.log(receiptLine('Leiter', 20))
