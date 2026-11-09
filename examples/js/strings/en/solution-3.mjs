function mark(name, query) {
  const wanted = query.trim().toLowerCase()
  const start = name.toLowerCase().indexOf(wanted)
  if (start === -1) return name
  const end = start + wanted.length
  // The positions come from the lowercase text, the pieces are cut from the original
  return `${name.slice(0, start)}[${name.slice(start, end)}]${name.slice(end)}`
}

console.log(mark('Bike trailer', 'TRAIL'))
console.log(mark('Sleeping bag', ' bag '))
console.log(mark('Ladder', 'tent'))
