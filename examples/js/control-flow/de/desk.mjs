// aus Schritt 1
const name = 'Bohrmaschine'
const availableFrom = null

// Der Tresen-Helfer arbeitet am Samstag, 31. Oktober 2026
const today = 'Samstag'

if (today === 'Mittwoch' || today === 'Samstag') {
  console.log('Der Tresen ist heute offen')
} else {
  console.log('Der Tresen ist heute zu')
}

console.log(name, availableFrom === null ? 'ist da' : 'ist ausgeliehen')

// Abholen und Zurückbringen gehen nur an den Tagen, an denen der Tresen offen ist
const week = [
  'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag',
  'Freitag', 'Samstag', 'Sonntag',
]
for (const day of week) {
  if (day === 'Mittwoch' || day === 'Samstag') {
    console.log('Offen am', day)
  }
}
