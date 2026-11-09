// Die acht Tage von heute, Samstag, 31. Oktober, bis zum nächsten Samstag
const days = [
  'Samstag', 'Sonntag', 'Montag', 'Dienstag',
  'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag',
]

// Heute zählt nicht, darum beginnt die Suche bei 1
for (let ahead = 1; ahead < days.length; ahead++) {
  const day = days[ahead]
  if (day !== 'Mittwoch' && day !== 'Samstag') continue
  console.log('Nächster offener Tag:', day, 'in', ahead, 'Tagen')
  break
}
