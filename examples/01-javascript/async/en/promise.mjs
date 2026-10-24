// Stand-ins for slow answers, the promises settle after a few milliseconds
function answerLater(milliseconds, value) {
  return new Promise((resolve) => setTimeout(() => resolve(value), milliseconds))
}

function failLater(milliseconds, message) {
  return new Promise((resolve, reject) => setTimeout(() => reject(new Error(message)), milliseconds))
}

answerLater(300, 'Catalog loaded')
  .then((message) => console.log(message))
  .finally(() => console.log('done'))

failLater(100, 'Server unreachable')
  .then(() => console.log('never shown'))
  .catch((error) => console.log(error.message))
