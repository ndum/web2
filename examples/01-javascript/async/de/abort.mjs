// Stand-in for fetch, the answer takes one second unless the signal aborts the request
function slowFetch(url, { signal }) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => resolve(new Response('[]')), 1000)
    signal.addEventListener('abort', () => {
      clearTimeout(timer)
      reject(signal.reason)
    })
  })
}

const controller = new AbortController()
setTimeout(() => controller.abort(), 300)
try {
  await slowFetch('https://lorraine-commons.example/items', { signal: controller.signal })
  console.log('geladen')
} catch (error) {
  console.log(error.name)
}

try {
  await slowFetch('https://lorraine-commons.example/items', { signal: AbortSignal.timeout(300) })
  console.log('geladen')
} catch (error) {
  console.log(error.name)
}
