const names = ['Drill', 'Jigsaw', 'Raclette oven']
const query = '  SAW '

const wanted = query.trim().toLowerCase()
for (const name of names) {
  if (name.toLowerCase().includes(wanted)) console.log(name)
}
