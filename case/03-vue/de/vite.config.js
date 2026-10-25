import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  // Relative paths, so the build works in any folder, for example on GitHub Pages
  base: './',
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    // Vite forwards requests to /items to the small server, so app and catalog share one address
    proxy: {
      '/items': 'http://localhost:3000',
    },
  },
  test: {
    environment: 'happy-dom',
  },
})
