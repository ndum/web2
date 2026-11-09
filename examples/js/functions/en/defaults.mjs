// Without a member number the test member M-117 applies
function requestLabel(name, member = 'M-117') {
  return name + ' for ' + member
}

console.log(requestLabel('Drill'))
console.log(requestLabel('Ladder', 'M-204'))
console.log(requestLabel('Projector', undefined))
console.log(requestLabel('Jigsaw', null))
