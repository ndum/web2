// The condition from step 2 now sits in a single place
function isOpen(day) {
  return day === 'Wednesday' || day === 'Saturday'
}

const isClosed = (day) => !isOpen(day)

console.log(isOpen('Saturday'), isOpen('Monday'))
console.log(isClosed('Sunday'))
