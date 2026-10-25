function checked(item) {
  return new Proxy(item, {
    set(target, key, value) {
      if (key === 'deposit' && (typeof value !== 'number' || value < 10 || value > 80)) {
        throw new RangeError(`Invalid deposit ${value}`)
      }
      target[key] = value
      return true
    },
  })
}

const drill = checked({ name: 'Drill', deposit: 20 })
drill.deposit = 30
console.log(drill.deposit)
try {
  drill.deposit = 5
} catch (error) {
  console.log(error.name, error.message)
}
