// Ohne Präfix vergibt makeNumbering Nummern für Reservationen
function makeNumbering(prefix = 'R') {
  let count = 0
  return () => {
    count += 1
    return prefix + '-' + count
  }
}

const nextNumber = makeNumbering()
const nextLoan = makeNumbering('L')
console.log(nextNumber(), nextNumber())
console.log(nextLoan(), nextNumber())
