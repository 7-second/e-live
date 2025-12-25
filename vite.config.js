import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  // FIX: define must be at the same level as plugins, not inside it
  define: {
    'process.env': {}
  },
  server: {
    host: true,
    port: 5173
  }
})