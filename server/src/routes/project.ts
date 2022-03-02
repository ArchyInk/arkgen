/*
 * @Author: Archy
 * @Date: 2022-01-31 11:27:01
 * @LastEditors: Archy
 * @LastEditTime: 2022-02-28 11:31:25
 * @FilePath: \arkgen\server\src\routes\project.ts
 * @description:
 */
import express from 'express'
import {
  lstatSync,
  readFileSync,
} from 'fs-extra'
import ext2lang from 'ext2lang'
import { parse } from 'path'
import { CWD } from '../shared/constants'
import Resp from '../class/Response'
import { dirDetail, findPkg, findViteConfig } from '../shared/utils'
import { DependenceList, DirType, FileInfoType, TaskListType } from '../../../types/server'
const router = express.Router()

export type ProjectInfoType = {
  path: string,
  dirs: DirType[],
  hasPkg?: boolean,
  pkg?: string,
  hasViteConfig?: boolean,
  viteConfig?: string,
}


router.get('/', async (req, res, next) => {
  // eslint-disable-line
  const resp = new Resp<ProjectInfoType>()
  const draft: ProjectInfoType = {
    path: CWD,
    dirs: []
  }

  try {
    const findPkgResult = await findPkg()
    const findViteConfigResult = await findViteConfig()
    Object.assign(draft, findPkgResult, findViteConfigResult)
    draft.dirs = await dirDetail(CWD)
    resp.setRes('获取项目详情成功！', true, draft)
  } catch (err) {
    console.error(err);
    resp.setRes(err)
  }
  res.send(resp.toRes())
})

router.get('/dir', async (req, res, next) => {
  const { path } = req.query
  const resp = new Resp<DirType[]>()
  if (typeof path === 'string') {
    try {
      const lstat = lstatSync(path)
      if (lstat.isDirectory()) {
        resp.setRes('获取目录详情成功', true, await dirDetail(path))
      } else {
        resp.setRes(`${path} 不是一个目录`)
      }
    } catch (err) {
      console.error(err);
      resp.setRes(`${err}`)
    }
  } else if (path === undefined) {
    resp.setRes('path 为必传参数!')
  } else {
    resp.setRes('path 类型必须为string!')
  }

  res.send(resp.toRes())
})

router.get('/file', async (req, res, next) => {
  const { path } = req.query
  const resp = new Resp<FileInfoType>()
  const draft: FileInfoType = {
    filename: '',
    lang: 'plaintext',
    content: '',
    path: path as string,
  }
  if (typeof path === 'string') {
    try {
      draft.content = readFileSync(path, 'utf-8')
      const { name, ext } = parse(path)
      draft.filename = name
      draft.lang = ext2lang(ext) ?? 'plaintext'
      resp.setRes('获取文件内容成功', true, draft)
    } catch (err) {
      console.error(err);
      resp.setRes(`${err}`)
    }
  } else if (path === undefined) {
    resp.setRes('path 为必传参数!')
  } else {
    resp.setRes('path 类型必须为string!')
  }

  res.send(resp.toRes())
})

router.get('/taskList', async (req, res, next) => {
  const resp = new Resp<TaskListType[]>()
  const draftArray: TaskListType[] = []
  try {
    const findPkgResult = await findPkg()
    if (findPkgResult.hasPkg) {
      const pkgObj = JSON.parse(findPkgResult.pkg)
      for (let name of Object.keys(pkgObj.scripts)) {
        draftArray.push({
          name,
          task: pkgObj.scripts[name],
          description: pkgObj['_scripts'] ? pkgObj['_scripts'][name] : undefined,
        })
      }
      resp.setRes('成功获取任务列表', true, draftArray)
    } else {
      resp.setRes('没找到pkg文件!')
    }
  } catch (err) {
    console.error(err);
    resp.setRes(`${err}`)
  }
  res.send(resp.toRes())
})

router.get('/dependenceList', async (req, res, next) => {
  const resp = new Resp<DependenceList[]>()
  const draftArray: DependenceList[] = []
  try {
    const findPkgResult = await findPkg()
    if (findPkgResult.hasPkg) {
      const pkgObj = JSON.parse(findPkgResult.pkg)
      const dependenceList = pkgObj.dependencies
      const devDependenceList = pkgObj.devDependencies

      if (dependenceList) {
        for (let name of Object.keys(dependenceList)) {
          draftArray.push({
            name,
            version: dependenceList[name],
          })
        }
      }

      if (devDependenceList) {
        for (let name of Object.keys(devDependenceList)) {
          draftArray.push({
            name,
            version: devDependenceList[name],
            dev: true
          })
        }
      }
      resp.setRes('成功获取依赖列表', true, draftArray)
    } else {
      resp.setRes('没找到pkg文件!')
    }
  } catch (err) {
    console.error(err);
    resp.setRes(`${err}`)
  }
  res.send(resp.toRes())
})




export default router
