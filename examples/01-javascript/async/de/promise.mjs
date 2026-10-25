// Stand-ins for slow answers, the promises settle after a few milliseconds
function answerLater(milliseconds, value) {
  return new Promise((resolve) => setTimeout(() => resolve(value), milliseconds))
}

function failLater(milliseconds, message) {
  return new Promise((resolve, reject) => setTimeout(() => reject(new Error(message)), milliseconds))
}

answerLater(300, 'Katalog geladen')
  .then((message) => console.log(message))
  .finally(() => console.log('fertig'))

failLater(100, 'Server nicht erreichbar')
  .then(() => console.log('kommt nie'))
  .catch((error) => console.log(error.message))
