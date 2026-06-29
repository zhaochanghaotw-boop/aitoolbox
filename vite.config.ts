import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// For GitHub Pages: set VITE_BASE_PATH=/your-repo-name/
// For Cloudflare Pages: leave default (/) or set VITE_BASE_PATH=/
export default defineConfig({
  base: process.env.VITE_BASE_PATH || '/',
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
})
