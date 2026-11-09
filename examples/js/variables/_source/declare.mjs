// [%Eine Ausleihe dauert höchstens sieben Tage, daran ändert das Programm nichts|A loan lasts at most seven days, the program never changes that%]
const maxDays = 7

// [%Die Summe wächst mit jedem ausgeliehenen Ding, darum let|The sum grows with every thing on loan, hence let%]
let depositOut = 0
depositOut = depositOut + 50
depositOut += 40
depositOut += 60
console.log(maxDays, depositOut)

// [%Ohne die beiden Schrägstriche bricht das Programm hier ab|Without the two slashes the program stops here%]
// maxDays = 14
