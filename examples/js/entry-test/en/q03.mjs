let total = 0
for (const deposit of [20, 50, 30]) {
  if (deposit > 40) continue
  total += deposit
}
console.log(total)
