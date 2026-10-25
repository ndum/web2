function createCounter() {
  let count = 0
  return {
    increase: () => (count += 1),
    reset: () => (count = 0),
  }
}

const reservations = createCounter()
reservations.increase()
reservations.increase()
console.log(reservations.increase())
reservations.reset()
console.log(reservations.increase())
