const available = [true, false, true, true, false]

let count = 0
for (const isIn of available) {
  if (isIn) count += 1
}
console.log(count)
