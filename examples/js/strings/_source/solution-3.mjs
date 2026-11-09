function mark(name, query) {
  const wanted = query.trim().toLowerCase()
  const start = name.toLowerCase().indexOf(wanted)
  if (start === -1) return name
  const end = start + wanted.length
  // [%Die Stellen stammen aus dem Text in Kleinbuchstaben, ausgeschnitten wird aus dem Original|The positions come from the lowercase text, the pieces are cut from the original%]
  return `${name.slice(0, start)}[${name.slice(start, end)}]${name.slice(end)}`
}

console.log(mark('[%Velo-Anhänger|Bike trailer%]', '[%anh|TRAIL%]'))
console.log(mark('[%Schlafsack|Sleeping bag%]', ' [%SACK|bag%] '))
console.log(mark('[%Leiter|Ladder%]', '[%zelt|tent%]'))
