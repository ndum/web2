const week = [
  '[%Montag|Monday%]', '[%Dienstag|Tuesday%]', '[%Mittwoch|Wednesday%]', '[%Donnerstag|Thursday%]',
  '[%Freitag|Friday%]', '[%Samstag|Saturday%]', '[%Sonntag|Sunday%]',
]

for (const day of week) {
  switch (day) {
    case '[%Mittwoch|Wednesday%]':
      console.log(day, '[%17 bis 19 Uhr|5 to 7 p.m.%]')
      break
    case '[%Samstag|Saturday%]':
      console.log(day, '[%10 bis 13 Uhr|10 a.m. to 1 p.m.%]')
      break
    default:
      console.log(day, '[%geschlossen|closed%]')
  }
}
