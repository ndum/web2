function createIdGenerator(prefix) {
  let next = 1
  return () => `${prefix}-${next++}`
}

const reservationId = createIdGenerator('R')
console.log(reservationId())
console.log(reservationId())

const loanId = createIdGenerator('L')
console.log(loanId(), reservationId())
