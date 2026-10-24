const names = ['[%Bohrmaschine|Drill%]', '[%Stichsäge|Jigsaw%]', '[%Raclette-Ofen|Raclette oven%]']
const query = '  [%säge|SAW%] '

const wanted = query.trim().toLowerCase()
for (const name of names) {
  if (name.toLowerCase().includes(wanted)) console.log(name)
}
