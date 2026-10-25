import { defineConfig } from 'vite'

export default defineConfig({
  // Relative paths, so the build works in any folder, for example on GitHub Pages
  base: './',
  server: {
    // Vite forwards requests to /items to the small server, so app and catalog share one address.
    // The preview uses the same rules unless it gets rules of its own.
    proxy: {
      '/items': 'http://localhost:3000',
    },
  },
})
