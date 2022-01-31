/*
 * @Author: Archy
 * @Date: 2022-01-31 21:02:37
 * @LastEditors: Archy
 * @LastEditTime: 2022-01-31 21:25:33
 * @FilePath: \arkgen\server\src\shared\utils.ts
 * @description:
 */

import {
  lstatSync,
  accessSync,
  constants,
  statSync,
  readdirSync,
} from 'fs-extra'
import { join } from 'path'

export const isDir = (path: string) => lstatSync(path).isDirectory()
export const isFile = (path: string) => lstatSync(path).isFile()
export const isExist = (path: string) => accessSync(path, constants.F_OK)
export const fileType = (path: string) =>
  isDir(path) ? 'directory' : isFile(path) ? 'file' : 'unknown'
export const dirDetail = (path: string) => {
  const names = readdirSync(path)
  const resArr = []
  for (let name of names) {
    const res = statSync(join(path, name))
    try {
      resArr.push({
        name,
        type: res.isDirectory()
          ? 'directory'
          : res.isFile()
          ? 'file'
          : 'unknown',
        info: res,
      })
    } catch (err) {
      resArr.push({
        name,
        err,
      })
    }
  }
  return resArr
}
