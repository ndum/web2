console.log('1 The program starts')
setTimeout(() => console.log('4 Timer'), 0)
Promise.resolve().then(() => console.log('3 Promise'))
console.log('2 The program is through')
