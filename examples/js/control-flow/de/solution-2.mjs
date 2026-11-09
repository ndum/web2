// Die Tage von einem Mittwoch bis zum nächsten Mittwoch
const days = [
  'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag',
  'Sonntag', 'Montag', 'Dienstag', 'Mittwoch',
]

let ahead = 1
while (days[ahead] !== 'Mittwoch' && days[ahead] !== 'Samstag') {
  ahead += 1
}
console.log('Nächster offener Tag:', days[ahead], 'in', ahead, 'Tagen')
