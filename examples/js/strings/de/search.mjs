const names = ['Bohrmaschine', 'Stichsäge', 'Raclette-Ofen']
const query = '  säge '

const wanted = query.trim().toLowerCase()
for (const name of names) {
  if (name.toLowerCase().includes(wanted)) console.log(name)
}
