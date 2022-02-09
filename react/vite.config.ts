/*
 * @author: Archy
 * @Date: 2022-01-28 14:33:10
 * @LastEditors: Archy
 * @LastEditTime: 2022-02-09 21:48:04
 * @FilePath: \arkgen\react\vite.config.ts
 * @description:
 */
import { defineConfig, loadEnv } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import { resolve } from 'path'

export default defineConfig(({ mode }) => {
  const config = {
    resolve: {
      alias: [{ find: '@', replacement: resolve(__dirname, './src') }],
      extensions: ['.js', '.jsx', '.less', '.json', '.ts', '.tsx'],
    },
    build: {
      outDir: '../web',
    },
    optimizeDeps: {
      include: [
      ],
    },
    plugins: [reactRefresh()],
  }
  if (mode === 'development') {
    return {
      ...config,
      server: {
        proxy: {
          '/api': {
            target: loadEnv(mode, resolve(process.cwd(),'react')).VITE_PROXY_URL,
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, ''),
          },
        },
      },
    }
  } else {
    return config
  }
})
