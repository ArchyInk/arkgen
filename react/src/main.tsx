/*
 * @author: Archy
 * @Date: 2022-01-29 10:30:41
 * @LastEditors: Archy
 * @LastEditTime: 2022-02-11 15:33:14
 * @FilePath: \arkgen\react\src\main.tsx
 * @description: 
 */
import React from 'react'
import ReactDOM from 'react-dom'
import { RecoilRoot } from 'recoil'
import 'antd/dist/antd.css'
import './styles/index.less'
import App from './App'
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <RecoilRoot>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </RecoilRoot>
  ,
  document.getElementById('root')
)
