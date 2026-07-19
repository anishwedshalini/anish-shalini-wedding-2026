import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'
import { renameSync, existsSync } from 'node:fs'

export default defineConfig({
  // Served from the root of the custom domain (anishwedshalini.in).
  base: '/',
  plugins: [
    react(),
    {
      // Build from index.vite.html (local/dev entry) but emit dist/index.html
      // so GitHub Pages can publish the production file at site root.
      name: 'emit-root-index',
      closeBundle() {
        const from = resolve(__dirname, 'dist/index.vite.html')
        const to = resolve(__dirname, 'dist/index.html')
        if (existsSync(from)) renameSync(from, to)
      },
    },
  ],
  server: {
    port: 5173,
    open: '/index.vite.html',
  },
  build: {
    rollupOptions: {
      input: resolve(__dirname, 'index.vite.html'),
    },
  },
})
