import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'

// Repair only the known duplicate JSX style attribute in Home.jsx before
// any JSX/esbuild transform sees it. This preserves the source/layout and
// changes only the build-time copy of the file.
function repairHomeHeroStyle() {
  return {
    name: 'repair-home-hero-style',
    enforce: 'pre',
    load(id) {
      if (!id.endsWith('/src/pages/Home.jsx')) return null
      const code = fs.readFileSync(id, 'utf8')
      const duplicate = /style=\{\{ y:\s*bgY\s*\}\}\s*style=\{\{\s*backgroundImage:`url\('\$\{s\.bg\}'\)`\s*\}\}/
      if (!duplicate.test(code)) return null
      return code.replace(duplicate, "style={{ y: bgY, backgroundImage:`url('${s.bg}')` }}")
    },
  }
}

export default defineConfig({
  plugins: [repairHomeHeroStyle(), react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react':  ['react','react-dom','react-router-dom'],
          'vendor-motion': ['framer-motion'],
          'vendor-icons':  ['lucide-react'],
        }
      }
    }
  }
})
