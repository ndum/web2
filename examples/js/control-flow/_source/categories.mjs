function label(category) {
  switch (category) {
    case 'tools':
      return '[%Werkzeug|Tools%]'
    case 'camping':
      return '[%Camping|Camping%]'
    default:
      return '[%Sonstiges|Other%]'
  }
}

console.log(label('tools'), label('camping'), label('music'))
