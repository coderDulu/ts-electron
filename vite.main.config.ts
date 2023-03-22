import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: 'src/main/index.ts',
        preload: 'src/preload/index.ts'
      },
      output: {
        dir: 'out',
        format: 'cjs',
        entryFileNames: '[name]/[name].js',
      },
      external: ['electron', 'path', 'fs'],
    },
    // 禁用public目录的复制
    // assetsInlineLimit: 0,
    // assetsDir: '',
    emptyOutDir: false,
    copyPublicDir: false
  }
})
