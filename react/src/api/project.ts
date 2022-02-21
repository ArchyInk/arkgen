/*
 * @Author: Archy
 * @Date: 2022-01-30 22:11:31
 * @LastEditors: Archy
 * @LastEditTime: 2022-02-21 11:13:35
 * @FilePath: \arkgen\react\src\api\project.ts
 * @description:
 */
import { request, AxiosPromise } from './request'
import { GeneralResponse } from './response'
import type { DirType, FileInfoType } from '../../../types/server'
export type { DirType, FileInfoType } from '../../../types/server'
import qs from 'qs'

export const api = {
  getProjectInfo: '/project',
  getDir: '/project/dir',
  getFile: '/project/file'
}

export interface ProjectInfo {
  path: string,
  hasPkg: boolean,
  pkg: any,
  dirs: DirType[]
}

export const getProjectInfo = (parameter?: any): AxiosPromise<ProjectInfo> => {
  return request({
    url: api.getProjectInfo,
    method: 'get',
    params: qs.stringify(parameter),
  })
}

export const getDir = (parameter?: any): AxiosPromise<DirType[]> => {
  return request({
    url: api.getDir,
    method: 'get',
    params: parameter,
  })
}


export const getFile = (parameter?: any): AxiosPromise<FileInfoType> => {
  return request({
    url: api.getFile,
    method: 'get',
    params: parameter,
  })
}
