console.log('1 [%Das Programm startet|The program starts%]')
setTimeout(() => console.log('4 Timer'), 0)
Promise.resolve().then(() => console.log('3 Promise'))
console.log('2 [%Das Programm ist durch|The program is through%]')
