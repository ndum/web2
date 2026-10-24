function label(category) {
  switch (category) {
    case 'tools':
      return 'Tools'
    case 'camping':
      return 'Camping'
    default:
      return 'Other'
  }
}

console.log(label('tools'), label('camping'), label('music'))
