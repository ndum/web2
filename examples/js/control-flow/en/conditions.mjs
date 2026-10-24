const me = 'M-117'

function stateLabel(item) {
  if (item.lentBy === null) {
    return 'available'
  } else if (item.lentBy === me) {
    return 'with you'
  } else {
    return 'on loan'
  }
}

console.log(stateLabel({ lentBy: null }), stateLabel({ lentBy: 'M-117' }), stateLabel({ lentBy: 'M-204' }))

const deposit = 80
console.log(deposit > 50 ? 'high deposit' : 'normal deposit')
