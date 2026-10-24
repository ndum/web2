const me = 'M-117'

function stateLabel(item) {
  if (item.lentBy === null) {
    return '[%verfügbar|available%]'
  } else if (item.lentBy === me) {
    return '[%bei dir|with you%]'
  } else {
    return '[%ausgeliehen|on loan%]'
  }
}

console.log(stateLabel({ lentBy: null }), stateLabel({ lentBy: 'M-117' }), stateLabel({ lentBy: 'M-204' }))

const deposit = 80
console.log(deposit > 50 ? '[%hohes Pfand|high deposit%]' : '[%normales Pfand|normal deposit%]')
