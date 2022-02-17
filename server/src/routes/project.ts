/*
 * @Author: Archy
 * @Date: 2022-01-31 11:27:01
 * @LastEditors: Archy
 * @LastEditTime: 2022-02-17 11:44:20
 * @FilePath: \arkgen\server\src\routes\project.ts
 * @description:
 */
import express from 'express'
import {
  lstatSync,
  readdirSync,
  readFileSync,
  accessSync,
  constants,
} from 'fs-extra'
import { join } from 'path'
import findUp from 'find-up'
import { CWD } from '../shared/constants'
import Resp from '../class/Response'
import { dirDetail } from '../shared/utils'
import { DirType } from '../../../types/server'
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

  const findPkg = async () => {
    const pkgPath = await findUp('package.json')
    if (pkgPath) {
      draft.hasPkg = true
      const pkg = readFileSync(pkgPath, 'utf-8')
      draft.pkg = pkg
    } else {
      draft.hasPkg = false
    }
  }

  const findViteConfig = async () => {
    const vitePath = await findUp(['vite.config.ts', 'vite.config.js'])
    if (vitePath) {
      draft.hasViteConfig = true
      const viteConfig = readFileSync(vitePath, 'utf-8')
      draft.viteConfig = viteConfig
    } else {
      draft.hasViteConfig = false
    }
  }

  try {
    await findPkg()
    await findViteConfig()
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
  const resp = new Resp()
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

export default router
