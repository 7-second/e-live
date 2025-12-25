import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  define: {
    // This solves the "process is not defined" white screen error
    'process.env': {},
    'global': 'window',
  },
  build: {
    // 1. Fixes the chunk size warning
    chunkSizeWarningLimit: 1600, 
    // 2. Splits libraries into their own files for better loading
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        },
      },
    },
  },
  server: {
    host: true,
    port: 5173
  }
})