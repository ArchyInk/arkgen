/*
 * @Author: Archy
 * @Date: 2022-01-31 11:27:01
 * @LastEditors: Archy
 * @LastEditTime: 2022-02-11 17:13:53
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
import { DirType } from '../shared/utils'
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
    draft.dirs = dirDetail(CWD)
    resp.setRes('获取项目详情成功！', true, draft)
  } catch (err) {
    resp.setRes(err)
  }
  res.send(resp.toRes())
})

router.post('/dir', function (req, res, next) {
  const { dirName } = req.body
  const resp = new Resp()
  if (dirName) {
    const _dirname = join(CWD, dirName)
    if (lstatSync(_dirname).isDirectory()) {
      try {
        resp.setRes(
          '获取目录下文件成功!',
          true,
          readdirSync(_dirname).map((item) => ({
            name: item,
            isDir: lstatSync(join(_dirname, item)).isDirectory(),
          }))
        )
      } catch (err) {
        resp.setRes(err)
      }
    } else {
      resp.setRes(`${dirName} 不是一个目录`)
    }
  } else {
    resp.setRes('dirName 为必传参数!')
  }
  res.send(resp.toRes())
})

export default router
