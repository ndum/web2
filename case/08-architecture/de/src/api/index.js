import { inject } from 'vue'

import { createHttpApi } from './http.js'
import { createMemoryApi } from './memory.js'

// The address of the course API. The proxy of Vite forwards /api to it, .env.local can change it.
export const API_URL = import.meta.env.VITE_API_URL ?? '/api/de'

// main.js provides the API under this key. A Symbol cannot clash with another key of the app.
export const apiKey = Symbol('api')

// The demo runs without a server, its mode sets VITE_API to memory in .env.demo
export function createApi() {
  return import.meta.env.VITE_API === 'memory' ? createMemoryApi() : createHttpApi(API_URL)
}

// The stores ask for the API instead of importing one, so main.js and the tests decide which one
// the app gets. Both adapters answer every call with ok, status and data.
export function useApi() {
  const api = inject(apiKey, null)
  if (api === null) throw new Error('No API provided. main.js provides one with app.provide(apiKey, createApi()).')
  return api
}
