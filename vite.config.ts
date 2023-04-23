import { defineConfig, splitVendorChunkPlugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import { join } from 'node:path'
import electron from 'vite-plugin-electron'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    base: './',
    root: "src/renderer",
    plugins: [
      vue(),
      splitVendorChunkPlugin(),
      electron([
        {
          entry: "src/main/index.ts",
          vite: {
            build: {
              outDir: "out/main"
            }
          }
        },
        {
          entry: "src/preload/index.ts",
          vite: {
            build: {
              outDir: "out/preload"
            }
          }
        }
      ])
    ],
    resolve: {
      alias: {
        '@': join(__dirname, 'src/renderer/src'),
      },
    },
    build: {
      rollupOptions: {
        cache: true,
        treeshake: true,
        output: {
          dir: 'out/renderer',
          manualChunks: {
            echarts: ['echarts'],
            'animate.css': ['animate.css'],
            'ant-design-vue': ['ant-design-vue']
          }
        }
      }
    }
  }
})
