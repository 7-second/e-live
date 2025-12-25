import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  define: {
    // This stops the "process is not defined" error globally
    'process.env': {},
  },
  build: {
    // 1. Increases the limit to 2MB so the warning disappears
    chunkSizeWarningLimit: 2000,
    
    // 2. Splitting logic: This moves heavy libraries into their own files
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Group HLS and React Player together
            if (id.includes('hls.js') || id.includes('react-player')) {
              return 'player-bundle';
            }
            // Group React core together
            if (id.includes('react')) {
              return 'react-core';
            }
            // Everything else in node_modules goes to 'vendor'
            return 'vendor';
          }
        },
      },
    },
  },
})