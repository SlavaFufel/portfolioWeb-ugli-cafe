import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// `base` is '/' for root hosting (Netlify, Vercel, any static host).
// If you deploy to a project subpath (e.g. GitHub Pages /repo/), set base: '/repo/'.
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
  },
})
