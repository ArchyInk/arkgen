/*
 * @Author: Archy
 * @Date: 2022-01-30 19:06:15
 * @LastEditors: Archy
 * @LastEditTime: 2022-01-30 19:27:38
 * @FilePath: \arkgen\react\src\stores\app.ts
 * @description:
 */

import { atom } from 'recoil'
import { App } from '../models/app'

const initialState: App = {
  theme: 'light',
}
export const appState = atom({
  key: 'appState',
  default: initialState,
})
