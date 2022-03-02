/*
 * @Author: Archy
 * @Date: 2022-01-30 22:11:31
 * @LastEditors: Archy
 * @LastEditTime: 2022-02-28 16:32:50
 * @FilePath: \arkgen\react\src\api\project.ts
 * @description:
 */
import { request, AxiosPromise } from './request'
import { GeneralResponse } from './response'
import type { DirType, FileInfoType, TaskListType, DependenceList } from '../../../types/server'
export type { DirType, FileInfoType, TaskListType, DependenceList } from '../../../types/server'
import qs from 'qs'

export const api = {
  getProjectInfo: '/project',
  getDir: '/project/dir',
  getFile: '/project/file',
  getTaskList:'/project/taskList',
  getDependenceList:'/project/dependenceList'
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

export const getTaskList = (parameter?: any): AxiosPromise<TaskListType[]> => {
  return request({
    url: api.getTaskList,
    method: 'get',
    params: parameter,
  })
}
export const getDependenceList = (parameter?: any): AxiosPromise<DependenceList[]> => {
  return request({
    url: api.getDependenceList,
    method: 'get',
    params: parameter,
  })
}
