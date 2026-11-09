// [%Der Velo-Anhänger ist ausgeliehen, von den Dingen für Kinder ist keines da|The bike trailer is on loan, none of the things for kids is in%]
const kidsIn = 0
console.log(kidsIn || '[%unbekannt|unknown%]')
console.log(kidsIn ?? '[%unbekannt|unknown%]')

// [%Das Feld für die Bemerkung ist leer geblieben|The field for the note stayed empty%]
const note = ''
console.log(note || '[%keine Bemerkung|no note%]')
console.log(note ?? '[%keine Bemerkung|no note%]')
