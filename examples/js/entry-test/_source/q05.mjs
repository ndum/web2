function label(name = '[%unbekannt|unknown%]') {
  return name
}

console.log(label(undefined), label(null))
