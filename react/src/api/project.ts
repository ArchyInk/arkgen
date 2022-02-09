/*
 * @Author: Archy
 * @Date: 2022-01-30 22:11:31
 * @LastEditors: Archy
 * @LastEditTime: 2022-02-09 14:55:40
 * @FilePath: \arkgen\react\src\api\project.ts
 * @description:
 */
import { request, AxiosPromise } from './request'
import { GeneralResponse } from './response'
import qs from 'qs'

export const api = {
  getProjectInfo: '/project',
  getDir: '/project/dir',
}

export interface ProjectInfo {
  path: string,
  hasPkg: boolean,
  pkg: any,
  dirs: {
    name: string,
    type: 'file' | 'directory',
    info: any
  }
}

export const getProjectInfo = (parameter?: any): AxiosPromise<ProjectInfo> => {
  return request({
    url: api.getProjectInfo,
    params: qs.stringify(parameter),
  })
}
