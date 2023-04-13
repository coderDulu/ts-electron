import { defineConfig } from 'vite';
import { join } from 'path';


// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: "node14",
    rollupOptions: {
      cache: true,
      treeshake: true,
      input: {
        main: join(__dirname, './src/main/index.ts'),
        preload: join(__dirname, './src/preload/index.ts')
      },
      output: {
        dir: 'out',
        format: 'cjs',
        entryFileNames: '[name]/index.js',
      },
      external: ['electron', 'path', 'fs', 'ws'], // 内置node模块和第三方模块
    },
    emptyOutDir: true,
    copyPublicDir: false
  }
})
