/*
 * @Author: Archy
 * @Date: 2022-01-29 22:34:13
 * @LastEditors: Archy
 * @LastEditTime: 2022-01-30 17:22:18
 * @FilePath: \arkgen\react\src\App.tsx
 * @description: 
 */
import { ConfigProvider } from 'antd'
import React from 'react'
import Router from './router'
function App() {
  return (
    <ConfigProvider>
      <Router />
    </ConfigProvider>
  )
}

export default App
