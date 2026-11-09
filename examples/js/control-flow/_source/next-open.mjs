// [%Die acht Tage von heute, Samstag, 31. Oktober, bis zum nächsten Samstag|The eight days from today, Saturday, October 31, to the next Saturday%]
const days = [
  '[%Samstag|Saturday%]', '[%Sonntag|Sunday%]', '[%Montag|Monday%]', '[%Dienstag|Tuesday%]',
  '[%Mittwoch|Wednesday%]', '[%Donnerstag|Thursday%]', '[%Freitag|Friday%]', '[%Samstag|Saturday%]',
]

// [%Heute zählt nicht, darum beginnt die Suche bei 1|Today does not count, so the search starts at 1%]
for (let ahead = 1; ahead < days.length; ahead++) {
  const day = days[ahead]
  if (day !== '[%Mittwoch|Wednesday%]' && day !== '[%Samstag|Saturday%]') continue
  console.log('[%Nächster offener Tag:|Next open day:%]', day, 'in', ahead, '[%Tagen|days%]')
  break
}
