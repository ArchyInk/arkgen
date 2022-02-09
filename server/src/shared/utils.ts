/*
 * @Author: Archy
 * @Date: 2022-01-31 21:02:37
 * @LastEditors: Archy
 * @LastEditTime: 2022-02-09 23:36:17
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
import { CWD } from './constants'
import nm from 'nanomatch'
export const isDir = (path: string): boolean => lstatSync(path).isDirectory()
export const isFile = (path: string): boolean => lstatSync(path).isFile()
export const isExist = (path: string): boolean => {
  try {
    accessSync(path, constants.F_OK)
    return true
  } catch (err) {
    return false
  }
}
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

export const findFileAsync = (
  filename: string,
  options?: { exclude?: string[]; include?: string[]; cwd?: string }
) => {
  const _cwd = options?.cwd ? options?.cwd : CWD
  const _include = options?.include
  const _exclude = options?.exclude
  const find = (dirPath: string) => {
    const filePath = join(dirPath, filename)
    let names = readdirSync(dirPath)
    if (_include) {
      let draft = []
      for (let inc of _include) {
        const matchs = nm.match(names, inc)
        draft = draft.concat(nm.match(names, inc))
      }
      names = draft
    }

    if (options?.exclude) {
      for (let exc of options.exclude) {
        names = nm.not(names, exc)
      }
    }

    for (let name of names) {
      const path = join(dirPath, name)
      console.log(filename)
      console.log(name)
      console.log(nm.isMatch(name, filename))
      if (isFile(path) && nm.isMatch(name, filename)) {
        return path
      }
    }

    for (let name of names) {
      const path = join(dirPath, name)
      isDir(path) && find(path)
    }
  }
  return find(_cwd)
}
