import { inject } from 'vue'

import { things } from './things.js'

// The key under which main.js provides the API
export const apiKey = Symbol('api')

// Two adapters with the same function. The page only knows loadItems, not where the data come from.
export function createMemoryApi() {
  return {
    loadItems: async () => ({ ok: true, data: things }),
  }
}

export function createBrokenApi() {
  return {
    loadItems: async () => ({ ok: false, data: { error: '[%Der Server ist nicht erreichbar.|The server cannot be reached.%]' } }),
  }
}

export function useApi() {
  return inject(apiKey)
}
