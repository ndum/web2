// [%Aus dem Formular kommt Text, die Zahl der Tage steht im Programm|The form delivers text, the program holds the number of days%]
const daysField = '4'
const days = 4

console.log(daysField === days, daysField == days, Number(daysField) === days)
console.log(Number('[%vier|four%]'), Number.isNaN(Number('[%vier|four%]')))
console.log(Boolean(0), Boolean(''), Boolean('0'), Boolean(null))
