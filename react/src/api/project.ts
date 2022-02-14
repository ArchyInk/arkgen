/*
 * @Author: Archy
 * @Date: 2022-01-30 22:11:31
 * @LastEditors: Archy
 * @LastEditTime: 2022-02-14 16:28:34
 * @FilePath: \arkgen\react\src\api\project.ts
 * @description:
 */
import { request, AxiosPromise } from './request'
import { GeneralResponse } from './response'
import { DirType } from '../../../types/server'
export type { DirType } from '../../../types/server'
import qs from 'qs'

export const api = {
  getProjectInfo: '/project',
  getDir: '/project/dir',
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
    params: qs.stringify(parameter),
  })
}

export const getDir = (parameter?: any): AxiosPromise<DirType[]> => {
  return request({
    url: api.getDir,
    params: qs.parse(parameter),
  })
}
