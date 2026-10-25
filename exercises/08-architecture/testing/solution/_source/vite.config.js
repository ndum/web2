import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'

import { MUTANTS } from './mutants/list.js'

// The check of your tests swaps one file of src for a mutant with a small mistake, see scripts/check.mjs
const mutant = MUTANTS.find((entry) => entry.id === process.env.MUTANT)

export default defineConfig({
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: [
      ...(mutant ? [{ find: mutant.replaces, replacement: fileURLToPath(new URL(`./mutants/${mutant.file}`, import.meta.url)) }] : []),
      { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
    ],
  },
  server: {
    // Addresses below /api go to the course API, without the prefix
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  test: {
    environment: 'happy-dom',
  },
})
