function createCounter() {
  let count = 0
  return () => {
    count += 1
    return count
  }
}

const next = createCounter()
next()
next()
console.log(next())
