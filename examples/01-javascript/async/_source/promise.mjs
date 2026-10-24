// Stand-ins for slow answers, the promises settle after a few milliseconds
function answerLater(milliseconds, value) {
  return new Promise((resolve) => setTimeout(() => resolve(value), milliseconds))
}

function failLater(milliseconds, message) {
  return new Promise((resolve, reject) => setTimeout(() => reject(new Error(message)), milliseconds))
}

answerLater(300, '[%Katalog geladen|Catalog loaded%]')
  .then((message) => console.log(message))
  .finally(() => console.log('[%fertig|done%]'))

failLater(100, '[%Server nicht erreichbar|Server unreachable%]')
  .then(() => console.log('[%kommt nie|never shown%]'))
  .catch((error) => console.log(error.message))
