// Die Bedingung aus Schritt 2 steht jetzt an einer einzigen Stelle
function isOpen(day) {
  return day === 'Mittwoch' || day === 'Samstag'
}

const isClosed = (day) => !isOpen(day)

console.log(isOpen('Samstag'), isOpen('Montag'))
console.log(isClosed('Sonntag'))
