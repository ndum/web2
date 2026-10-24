function receiptLine(name, deposit) {
  return `${name.padEnd(16, '.')} CHF ${deposit.toFixed(2).padStart(6)}`
}

console.log(receiptLine('Tent', 50))
console.log(receiptLine('Ladder', 20))
