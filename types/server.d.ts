/*
 * @author: Archy
 * @Date: 2022-02-14 15:36:34
 * @LastEditors: Archy
 * @LastEditTime: 2022-02-17 14:03:03
 * @FilePath: \arkgen\types\server.d.ts
 * @description: 
 */
import { Stats } from 'fs-extra'

export type DirType = {
  title: string,
  type: 'directory' | 'file' | 'unknown' | 'error',
  key: string,
  isLeaf: boolean,
  ext?: string,
  children?: DirType[],
  info?: Stats,
  err?: Error
}