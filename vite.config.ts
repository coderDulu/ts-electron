import { defineConfig, splitVendorChunkPlugin, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import { resolve } from 'node:path'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    base: './',
    root: "src/renderer",
    plugins: [
      vue(), 
      splitVendorChunkPlugin(),
      Components({
        resolvers: [AntDesignVueResolver()],
      }),
    ],
    resolve: {
      alias: {
        '@': resolve('src/renderer/src'),
        '@root': resolve('./'),
      }
    },
    build: {
      rollupOptions: {
        cache: true,
        treeshake: true,
        output: {
          dir: 'out/renderer',
        }
      }
    }
  }
})