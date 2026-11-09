// The longest loan applies in the whole file
const maxDays = 7

function allowed(days) {
  const tooLong = days > maxDays
  return !tooLong
}

for (const days of [4, 11]) {
  console.log(days, allowed(days))
}

// Without the two slashes the program stops, because tooLong only exists inside the function
// console.log(tooLong)
