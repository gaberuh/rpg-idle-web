import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/api/v1/auth': {
        target: 'http://localhost:8081',
        changeOrigin: true,
      },
      '/api/v1/characters': {
        target: 'http://localhost:8082',
        changeOrigin: true,
      },
      '/api/v1/hunts': {
        target: 'http://localhost:8083',
        changeOrigin: true,
      },
      '/api/v1/training': {
        target: 'http://localhost:8083',
        changeOrigin: true,
      },
      '/api/v1/inventory': {
        target: 'http://localhost:8084',
        changeOrigin: true,
      },
    },
  },
})
