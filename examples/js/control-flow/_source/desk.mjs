// [%aus Schritt 1|from step 1%]
const name = '[%Bohrmaschine|Drill%]'
const availableFrom = null

// [%Der Tresen-Helfer arbeitet am Samstag, 31. Oktober 2026|The counter helper works on Saturday, October 31, 2026%]
const today = '[%Samstag|Saturday%]'

if (today === '[%Mittwoch|Wednesday%]' || today === '[%Samstag|Saturday%]') {
  console.log('[%Der Tresen ist heute offen|The counter is open today%]')
} else {
  console.log('[%Der Tresen ist heute zu|The counter is closed today%]')
}

console.log(name, availableFrom === null ? '[%ist da|is in%]' : '[%ist ausgeliehen|is on loan%]')

// [%Abholen und Zurückbringen gehen nur an den Tagen, an denen der Tresen offen ist|Pickup and return only work on the days the counter is open%]
const week = [
  '[%Montag|Monday%]', '[%Dienstag|Tuesday%]', '[%Mittwoch|Wednesday%]', '[%Donnerstag|Thursday%]',
  '[%Freitag|Friday%]', '[%Samstag|Saturday%]', '[%Sonntag|Sunday%]',
]
for (const day of week) {
  if (day === '[%Mittwoch|Wednesday%]' || day === '[%Samstag|Saturday%]') {
    console.log('[%Offen am|Open on%]', day)
  }
}
