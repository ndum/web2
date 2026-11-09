// from step 1
const name = 'Drill'
const availableFrom = null

// The counter helper works on Saturday, October 31, 2026
const today = 'Saturday'

if (today === 'Wednesday' || today === 'Saturday') {
  console.log('The counter is open today')
} else {
  console.log('The counter is closed today')
}

console.log(name, availableFrom === null ? 'is in' : 'is on loan')

// Pickup and return only work on the days the counter is open
const week = [
  'Monday', 'Tuesday', 'Wednesday', 'Thursday',
  'Friday', 'Saturday', 'Sunday',
]
for (const day of week) {
  if (day === 'Wednesday' || day === 'Saturday') {
    console.log('Open on', day)
  }
}
