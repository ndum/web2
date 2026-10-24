try {
  console.log('a')
  throw new Error('b')
} catch (error) {
  console.log(error.message)
} finally {
  console.log('c')
}
