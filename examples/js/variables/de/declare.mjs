// Eine Ausleihe dauert höchstens sieben Tage, daran ändert das Programm nichts
const maxDays = 7

// Die Summe wächst mit jedem ausgeliehenen Ding, darum let
let depositOut = 0
depositOut = depositOut + 50
depositOut += 40
depositOut += 60
console.log(maxDays, depositOut)

// Ohne die beiden Schrägstriche bricht das Programm hier ab
// maxDays = 14
