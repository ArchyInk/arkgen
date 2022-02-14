/*
 * @author: Archy
 * @Date: 2022-02-14 15:36:34
 * @LastEditors: Archy
 * @LastEditTime: 2022-02-14 15:53:51
 * @FilePath: \arkgen\types\types.d.ts
 * @description: 
 */
import { Stats } from 'fs-extra'

export type DirType = {
  title: string,
  type: 'directory' | 'file' | 'unknown' | 'error',
  key: string,
  isLeaf: boolean,
  children?: DirType[],
  info?: Stats,
  err?: Error
}