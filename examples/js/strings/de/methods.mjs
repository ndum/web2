// So kommt eine Mitgliedernummer oft aus dem Formular, mit Leerzeichen und kleinem m
const typed = '  m-117 '

const number = typed.trim().toUpperCase()
console.log(number, number.length, typed.length)
console.log(number.startsWith('M-'), number.slice(2))
console.log('2026-11-12'.split('-'))
