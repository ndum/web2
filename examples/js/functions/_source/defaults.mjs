// [%Ohne Mitgliedernummer gilt das Testmitglied M-117|Without a member number the test member M-117 applies%]
function requestLabel(name, member = 'M-117') {
  return name + ' [%für|for%] ' + member
}

console.log(requestLabel('[%Bohrmaschine|Drill%]'))
console.log(requestLabel('[%Leiter|Ladder%]', 'M-204'))
console.log(requestLabel('[%Beamer|Projector%]', undefined))
console.log(requestLabel('[%Stichsäge|Jigsaw%]', null))
