// [%So kommt eine Mitgliedernummer oft aus dem Formular, mit Leerzeichen und kleinem m|This is how a member number often arrives from the form, with spaces and a lowercase m%]
const typed = '  m-117 '

const number = typed.trim().toUpperCase()
console.log(number, number.length, typed.length)
console.log(number.startsWith('M-'), number.slice(2))
console.log('2026-11-12'.split('-'))
