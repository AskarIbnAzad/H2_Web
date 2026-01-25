import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Enables listening on all available network interfaces
    port: 5173, // Optional, default is 5173
  },
})
