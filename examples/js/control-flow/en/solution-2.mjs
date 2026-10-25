const deposits = [20, 30, 50, 80, 10]

let found = null
for (const deposit of deposits) {
  if (deposit > 40) {
    found = deposit
    break
  }
}
console.log(found)
