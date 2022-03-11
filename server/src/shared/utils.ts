/*
 * @Author: Archy
 * @Date: 2022-01-31 21:02:37
 * @LastEditors: Archy
 * @LastEditTime: 2022-03-10 15:28:11
 * @FilePath: \arkgen\server\src\shared\utils.ts
 * @description:
 */

import {
  lstatSync,
  accessSync,
  constants,
  statSync,
  readdirSync,
  readFileSync
} from 'fs-extra'
import { DirType } from '../../../types/server'
import { join, extname } from 'path'
import { CWD } from './constants'
import nm from 'nanomatch'
import findUp from 'find-up'
import execa from 'execa'
import iconv from 'iconv-lite'

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
export const dirDetail = async (path: string): Promise<DirType[]> => {
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
        ext: res.isFile() ? extname(name) : undefined,
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

/**
 * @description: 向上查找pkg
 * @param {*}
 * @return {*}
 */
export const findPkg = async () => {
  const draft: { hasPkg: boolean, pkg?: string } = { hasPkg: false }
  const pkgPath = await findUp('package.json')
  if (pkgPath) {
    draft.hasPkg = true
    const pkg = readFileSync(pkgPath, 'utf-8')
    draft.pkg = pkg
  }
  return draft
}

/**
 * @description: 向上查找vite配置
 * @param {*}
 * @return {*}
 */
export const findViteConfig = async () => {
  const draft: { hasViteConfig: boolean, viteConfig?: string } = { hasViteConfig: false }
  const vitePath = await findUp(['vite.config.ts', 'vite.config.js'])
  if (vitePath) {
    draft.hasViteConfig = true
    const viteConfig = readFileSync(vitePath, 'utf-8')
    draft.viteConfig = viteConfig
  }
  return draft
}

/**
 * @description: 删除字符串首尾双引号
 * @param {string} strs
 * @return {*}
 */
export const removeDblquo = (str: string) => str.substring(0, str.length)

/**
 * @description: 解决中文会乱码的问题
 * @param {*}
 * @return {*}
 */
export const transformEncode = (arg: string | Buffer) => {
  if (typeof arg === 'string') {
    return iconv.decode(Buffer.from(removeDblquo(arg), 'binary'), 'cp936')
  } else if (arg instanceof Buffer) {
    return iconv.decode(arg, 'cp936')
  }
}


/**
 * @description: 解决exec显示中文会乱码的问题
 * @param {*} cmd string 命令
 * @return {*}
 */
export const execaShims = async (cmd: string, cwd: string) => {
  const { stdout, stderr } = await execa.command(cmd, { encoding: 'binary', cwd })

  return {
    stdout: iconv.decode(Buffer.from(removeDblquo(stdout), 'binary'), 'cp936'),
    stderr: iconv.decode(Buffer.from(removeDblquo(stderr), 'binary'), 'cp936')
  }
}