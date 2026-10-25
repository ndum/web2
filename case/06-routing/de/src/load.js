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
      throw new LoadError('Der Server antwortet zu langsam.', { cause: error })
    }
    throw new LoadError('Der Server ist nicht erreichbar.', { cause: error })
  }
  if (!response.ok) {
    throw new LoadError(`Der Server antwortet mit dem Status ${response.status}.`)
  }
  return response.json()
}
