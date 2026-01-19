import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    // Otimizacoes de build - usa esbuild (padrao, mais rapido)
    minify: 'esbuild',
    // CSS inline para First Paint rapido
    cssCodeSplit: false,
    // Chunk splitting otimizado
    rollupOptions: {
      output: {
        manualChunks: undefined,
        // Nomes de arquivo com hash curto
        entryFileNames: 'js/[name]-[hash:8].js',
        chunkFileNames: 'js/[name]-[hash:8].js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name.endsWith('.css')) {
            return 'css/[name]-[hash:8][extname]'
          }
          return 'assets/[name]-[hash:8][extname]'
        }
      }
    },
    // Target browsers modernos para bundle menor
    target: 'es2020',
    // Gerar sourcemaps apenas em dev
    sourcemap: false
  },
  // Otimizacoes de dev server
  server: {
    port: 3000,
    open: true,
    cors: true
  },
  // Preview server
  preview: {
    port: 4173
  },
  // Otimizacoes CSS
  css: {
    devSourcemap: true
  }
})
