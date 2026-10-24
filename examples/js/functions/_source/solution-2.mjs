function loanDays(from, to = from) {
  const millisecondsPerDay = 1000 * 60 * 60 * 24
  return (new Date(to) - new Date(from)) / millisecondsPerDay + 1
}

console.log(loanDays('2026-11-02', '2026-11-04'))
console.log(loanDays('2026-11-02'))
