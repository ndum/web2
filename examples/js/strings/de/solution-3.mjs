function mark(name, query) {
  const wanted = query.trim().toLowerCase()
  const start = name.toLowerCase().indexOf(wanted)
  if (start === -1) return name
  const end = start + wanted.length
  // Die Stellen stammen aus dem Text in Kleinbuchstaben, ausgeschnitten wird aus dem Original
  return `${name.slice(0, start)}[${name.slice(start, end)}]${name.slice(end)}`
}

console.log(mark('Velo-Anhänger', 'anh'))
console.log(mark('Schlafsack', ' SACK '))
console.log(mark('Leiter', 'zelt'))
