// Die längste Ausleihe gilt in der ganzen Datei
const maxDays = 7

function allowed(days) {
  const tooLong = days > maxDays
  return !tooLong
}

for (const days of [4, 11]) {
  console.log(days, allowed(days))
}

// Ohne die beiden Schrägstriche bricht das Programm ab, denn tooLong gibt es nur in der Funktion
// console.log(tooLong)
