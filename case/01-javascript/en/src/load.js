// The address can be changed with the environment variable CATALOG_URL, the tests use that
export const CATALOG_URL = process.env.CATALOG_URL ?? 'http://localhost:3000/items'

export class LoadError extends Error {
  constructor(message, options) {
    super(message, options)
    this.name = 'LoadError'
  }
}

// Loads the catalog from the association's server and returns the array of things.
// Gives up after timeout milliseconds, every problem ends as a LoadError with a clear message.
export async function loadItems(url, { timeout = 5000 } = {}) {
  let response
  try {
    response = await fetch(url, { signal: AbortSignal.timeout(timeout) })
  } catch (error) {
    if (error.name === 'TimeoutError' || error.name === 'AbortError') {
      throw new LoadError('The server is too slow to answer.', { cause: error })
    }
    throw new LoadError('The server cannot be reached.', { cause: error })
  }
  if (!response.ok) {
    throw new LoadError(`The server answers with status ${response.status}.`)
  }
  return response.json()
}
