/*
 * @Author: Archy
 * @Date: 2022-01-30 22:08:43
 * @LastEditors: Archy
 * @LastEditTime: 2022-01-30 22:10:11
 * @FilePath: \arkgen\react\src\stores\project.ts
 * @description:
 */
import { atom } from 'recoil'

export const projectState = atom({
  key: 'projectState',
  default: {},
})
