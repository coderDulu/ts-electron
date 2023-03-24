import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve, join } from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    base: './', // 设置打包后的基础路径
    plugins: [react()],
    root: "src/renderer",
    resolve: {
      alias: {
        '@': resolve('src/renderer/src'),
        '@root': resolve('./'),
        'antd/dist/reset.css': join(__dirname, 'node_modules/antd/dist/reset.css'),  // <-- add this
        antd: join(__dirname, 'node_modules/antd/dist/antd.js'),
        '@ant-design/icons': join(__dirname, 'node_modules/@ant-design/icons/dist/index.umd.js'),
      }
    },
    server: {
      port: Number(env.VITE_APP_PORT) || 5173,
    },
    build: {
      rollupOptions: {
        output: {
          dir: 'out/renderer',
        }
      }
    }
  }
}
)
