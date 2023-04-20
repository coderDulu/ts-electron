import { defineConfig, splitVendorChunkPlugin, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { join } from 'node:path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  console.log(join(__dirname, 'src/renderer'));
  return {
    base: './',
    root: "src/renderer",
    plugins: [
      vue(),
      splitVendorChunkPlugin(),
    ],
    resolve: {
      alias: {
        '@': join(__dirname, 'src/renderer/src'),
      },
    },
    server: {
      port: Number(env.VITE_APP_PORT) || 5173,
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
  // }
})
