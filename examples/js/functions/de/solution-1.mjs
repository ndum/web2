// loanDays aus dem Tresen-Helfer
const loanDays = (from, to) => (Date.parse(to) - Date.parse(from)) / 86_400_000

const tooLong = (from, to) => loanDays(from, to) > 7

console.log(loanDays('2026-11-07', '2026-11-14'), tooLong('2026-11-07', '2026-11-14'))
console.log(loanDays('2026-11-07', '2026-11-18'), tooLong('2026-11-07', '2026-11-18'))
