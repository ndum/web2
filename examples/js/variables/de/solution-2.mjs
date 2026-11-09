// Drei Texte, die im Formularfeld für die Tage stehen können
const typed = '4'
const word = 'vier'
const empty = ''

console.log(Number(typed), Number.isNaN(Number(typed)))
console.log(Number(word), Number.isNaN(Number(word)))
console.log(Number(empty), Number.isNaN(Number(empty)))
