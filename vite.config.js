import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  // This is the CRITICAL part for the white screen fix
  define: {
    'process.env': {},
    'global': {},
  },
  server: {
    host: true,
    port: 5173
  }
})