/*
 * @author: Archy
 * @Date: 2022-01-28 15:49:38
 * @LastEditors: Archy
 * @LastEditTime: 2022-01-29 13:24:19
 * @FilePath: \code-generator\server\src\routes\users.ts
 * @description:
 */
import express from 'express'
const router = express.Router()
const { readFileSync, writeFileSync } = require('fs-extra')

router.get('/', function (req, res, next) { // eslint-disable-line
  const text = readFileSync('./index.js', 'utf-8')
  writeFileSync('test.js', 'test', 'utf-8')
  res.send(text)
})

export default router
