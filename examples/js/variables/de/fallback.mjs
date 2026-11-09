// Der Velo-Anhänger ist ausgeliehen, von den Dingen für Kinder ist keines da
const kidsIn = 0
console.log(kidsIn || 'unbekannt')
console.log(kidsIn ?? 'unbekannt')

// Das Feld für die Bemerkung ist leer geblieben
const note = ''
console.log(note || 'keine Bemerkung')
console.log(note ?? 'keine Bemerkung')
