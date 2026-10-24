function label(category) {
  switch (category) {
    case 'tools':
      return 'Werkzeug'
    case 'camping':
      return 'Camping'
    default:
      return 'Sonstiges'
  }
}

console.log(label('tools'), label('camping'), label('music'))
