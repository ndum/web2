// The address of the course API. The proxy of Vite forwards /api to it, .env.local can change it.
export const API = import.meta.env.VITE_API_URL ?? '/api/de'
