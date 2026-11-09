// [%Die Tage von einem Mittwoch bis zum nächsten Mittwoch|The days from a Wednesday to the next Wednesday%]
const days = [
  '[%Mittwoch|Wednesday%]', '[%Donnerstag|Thursday%]', '[%Freitag|Friday%]', '[%Samstag|Saturday%]',
  '[%Sonntag|Sunday%]', '[%Montag|Monday%]', '[%Dienstag|Tuesday%]', '[%Mittwoch|Wednesday%]',
]

let ahead = 1
while (days[ahead] !== '[%Mittwoch|Wednesday%]' && days[ahead] !== '[%Samstag|Saturday%]') {
  ahead += 1
}
console.log('[%Nächster offener Tag:|Next open day:%]', days[ahead], 'in', ahead, '[%Tagen|days%]')
