/*
 * @Author: Archy
 * @Date: 2022-01-31 21:02:37
 * @LastEditors: Archy
 * @LastEditTime: 2022-02-14 16:15:27
 * @FilePath: \arkgen\server\src\shared\utils.ts
 * @description:
 */

import {
  lstatSync,
  accessSync,
  constants,
  statSync,
  readdirSync,
  Stats,
} from 'fs-extra'
import { DirType } from '../../../types/server'
import { join } from 'path'
import { CWD } from './constants'
import nm from 'nanomatch'


/**
 * @description: 判断路径是否为目录
 * @param {string} path
 * @return {boolean} 
 */
export const isDir = (path: string): boolean => lstatSync(path).isDirectory()

/**
 * @description: 判断路径是否为文件
 * @param {string} path
 * @return {boolean} 
 */
export const isFile = (path: string): boolean => lstatSync(path).isFile()

/**
 * @description: 判断路径是否存在
 * @param {string} path
 * @return {boolean}
 */
export const isExist = (path: string): boolean => {
  try {
    accessSync(path, constants.F_OK)
    return true
  } catch (err) {
    return false
  }
}

/**
 * @description: 判断路径类型
 * @param {string} path
 * @return {'directory' | 'file' | 'unknown'}
 */
export const pathType = (path: string): 'directory' | 'file' | 'unknown' =>
  isDir(path) ? 'directory' : isFile(path) ? 'file' : 'unknown'

/**
 * @description: 目录详情，获取目录下所有路径的详情
 * @param {string} path
 * @return {DirsType}
 */
export const dirDetail = (path: string): DirType[] => {
  const names = readdirSync(path)
  const resArr: DirType[] = []
  for (let name of names) {
    const res = statSync(join(path, name))
    try {
      resArr.push({
        title: name,
        key: join(path, name),
        type: res.isDirectory()
          ? 'directory'
          : res.isFile()
            ? 'file'
            : 'unknown',
        isLeaf: res.isFile() ? true : false,
        info: res,
      })
    } catch (err) {
      resArr.push({
        title: name,
        key: join(path, name),
        type: 'error',
        isLeaf: true,
        err,
      })
    }
  }
  return resArr.sort((a, b) => {
    const typeToNum = (item: DirType) => {
      return item.type === 'directory' ? 3 : item.type === 'file' ? 2 : item.type === 'unknown' ? 1 : -1
    }
    return typeToNum(b) - typeToNum(a)
  })
}


/**
 * @description: 向下查找文件
 * @param {string} filename 文件名,支持通配符
 * @param {{ exclude?: string[]; include?: string[]; cwd?: string }} options exclude 排除的文件夹 include包括的文件夹 cwd搜索的根目录，默认为项目根目录
 * @return {string} 
 */
export const findFileAsync = (filename: string, options?: { exclude?: string[]; include?: string[]; cwd?: string }): string => {
  const _cwd = options?.cwd ? options?.cwd : CWD
  const include = options?.include
  const exclude = options?.exclude
  let _include = include
  const find = (dirPath: string) => {
    let names = readdirSync(dirPath)
    let _names = names
    for (let name of names) {
      const path = join(dirPath, name)
      if (exclude) {
        for (let exc of exclude) {
          if (nm.isMatch(path, join(_cwd, exc))) {
            _names = _names.filter((item) => item !== name)
            continue
          }
        }
      }
      if (_include && _include.length > 0) {
        for (let inc of _include) {
          const draft = []
          if (nm.isMatch(path, join(_cwd, inc))) {
            draft.push(name)
            _include = _include.filter((item) => item !== inc)
            _names = draft
            if (isFile(path) && nm.isMatch(path, join(dirPath, filename))) {
              return path
            } else {
              continue
            }
          }
        }
      } else {
        if (isFile(path) && nm.isMatch(name, filename)) {
          return path
        }
      }
    }

    for (let name of _names) {
      const path = join(dirPath, name)
      if (isDir(path)) {
        const p = find(path)
        if (p) {
          return find(path)
        }
      }
    }
  }
  return find(_cwd)
}
