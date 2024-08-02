import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  define: {
   __VITE_SERVER_DATA_URI: process.env.VITE_SERVER_DATA_URI
  }
})
