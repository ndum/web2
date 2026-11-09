function makeNumbering(prefix) {
  let count = 0
  return {
    next: () => {
      count += 1
      return prefix + '-' + count
    },
    // Liest count nur, ändern kann es allein next
    issued: () => count,
  }
}

const numbers = makeNumbering('R')
console.log(numbers.next(), numbers.next())
console.log(numbers.issued(), numbers.count)
