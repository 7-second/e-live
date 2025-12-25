import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  define: {
    // This polyfills 'process.env' to prevent the "process is not defined" error
    'process.env': {},
    'process.browser': true,
  },
  server: {
    host: true,
    port: 5173
  },
  build: {
    // This ensures Vercel handles the production build correctly
    outDir: 'dist',
    sourcemap: false
  }
})