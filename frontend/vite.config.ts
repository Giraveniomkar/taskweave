import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: "/taskweave/",   // 👈 ADD THIS LINE
  plugins: [react()],
})
