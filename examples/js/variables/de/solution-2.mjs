function depositOrDefault(value) {
  return value ?? 20
}

console.log(depositOrDefault(50), depositOrDefault(0), depositOrDefault(null), depositOrDefault(undefined))
