/*
 * @Author: Archy
 * @Date: 2022-01-31 11:27:01
 * @LastEditors: Archy
 * @LastEditTime: 2022-01-31 21:49:06
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
const router = express.Router()

router.get('/', async (req, res, next) => {
  // eslint-disable-line
  const resp = new Resp()
  const draft: Record<string, any> = {
    path: CWD,
  }
  try {
    const pkgPath = await findUp('package.json')
    if (pkgPath) {
      draft.hasPkg = true
      const pkg = readFileSync(pkgPath, 'utf-8')
      draft.pkg = JSON.parse(pkg)
    } else {
      draft.hasPkg = false
    }
    draft.dirs = dirDetail(CWD)
    resp.success = true
    resp.msg = '获取项目详情成功！'
    resp.data = draft
  } catch (err) {
    resp.success = false
    resp.msg = err
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
        resp.data = readdirSync(_dirname).map((item) => ({
          name: item,
          isDir: lstatSync(join(_dirname, item)).isDirectory(),
        }))
        resp.success = true
        resp.msg = '获取目录下文件成功'
      } catch (err) {
        resp.msg = err
      }
    } else {
      resp.msg = `${dirName} 不是一个目录`
    }
  } else {
    resp.msg = 'dirName 为必传参数!'
  }
  res.send(resp.toRes())
})

export default router
