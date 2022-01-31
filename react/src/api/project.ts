/*
 * @Author: Archy
 * @Date: 2022-01-30 22:11:31
 * @LastEditors: Archy
 * @LastEditTime: 2022-01-31 22:16:30
 * @FilePath: \arkgen\react\src\api\project.ts
 * @description:
 */
import { request } from './request'
import qs from 'qs'

export const api = {
  getProjectInfo: '/project',
  getDir: '/project/dir',
}

export const getProjectInfo = (parameter?: any) => {
  return request({
    url: api.getProjectInfo,
    params: qs.stringify(parameter),
  })
}
