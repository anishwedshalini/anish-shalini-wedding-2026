import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/anish-shalini-wedding-2026/',
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
})
