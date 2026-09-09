import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Repair only the known duplicate JSX style attribute in Home.jsx before esbuild.
// This keeps the existing Home source/layout intact while removing the build warning.
function repairHomeHeroStyle() {
  const duplicate = /style=\{\{ y: bgY \}\}\s*style=\{\{ backgroundImage:`url\('\$\{s\.bg\}'\)` \}\}/
  const replacement = "style={{ y: bgY, backgroundImage:`url('${s.bg}')` }}"
  return {
    name: 'repair-home-hero-style',
    enforce: 'pre',
    transform(code, id) {
      if (!id.endsWith('/src/pages/Home.jsx') || !duplicate.test(code)) return null
      return { code: code.replace(duplicate, replacement), map: null }
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
