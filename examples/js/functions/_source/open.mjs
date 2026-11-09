// [%Die Bedingung aus Schritt 2 steht jetzt an einer einzigen Stelle|The condition from step 2 now sits in a single place%]
function isOpen(day) {
  return day === '[%Mittwoch|Wednesday%]' || day === '[%Samstag|Saturday%]'
}

const isClosed = (day) => !isOpen(day)

console.log(isOpen('[%Samstag|Saturday%]'), isOpen('[%Montag|Monday%]'))
console.log(isClosed('[%Sonntag|Sunday%]'))
