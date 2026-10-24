function readSettings(text) {
  try {
    return JSON.parse(text)
  } catch (error) {
    console.log('Settings unreadable, using the default', error.name)
    return { pageSize: 20 }
  }
}

console.log(readSettings('{"pageSize": 50}').pageSize)
console.log(readSettings('pageSize: 50').pageSize)
