const deposits = [20, 50, 30, 40]

let total = 0
for (const deposit of deposits) {
  total += deposit
}
console.log(total)

let index = 0
while (index < deposits.length && deposits[index] < 40) {
  index += 1
}
console.log(index)
