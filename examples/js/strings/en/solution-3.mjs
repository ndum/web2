const line = 'Jigsaw; Tools; 20'

const [name, category, deposit] = line.split(';').map((part) => part.trim())
console.log(name, category, Number(deposit) + 5)
