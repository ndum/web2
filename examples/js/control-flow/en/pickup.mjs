// The beer bench set is on loan and back from November 3
const name = 'Beer bench set'
const availableFrom = '2026-11-03'
// A member wants to pick it up on Saturday, November 7
const pickup = '2026-11-07'

if (availableFrom === null) {
  console.log(name, 'is in')
} else if (availableFrom <= pickup) {
  console.log(name, 'is back in time for the pickup')
} else {
  console.log(name, 'is still on loan at the pickup')
}
