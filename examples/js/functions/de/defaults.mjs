// Ohne Mitgliedernummer gilt das Testmitglied M-117
function requestLabel(name, member = 'M-117') {
  return name + ' für ' + member
}

console.log(requestLabel('Bohrmaschine'))
console.log(requestLabel('Leiter', 'M-204'))
console.log(requestLabel('Beamer', undefined))
console.log(requestLabel('Stichsäge', null))
