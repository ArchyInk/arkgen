/*
 * @author: Archy
 * @Date: 2022-01-28 14:33:10
 * @LastEditors: Archy
 * @LastEditTime: 2022-01-28 15:55:21
 * @FilePath: \code-generator\react\vite.config.ts
 * @description: 
 */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: '../web',
  },
  plugins: [react()]
})
