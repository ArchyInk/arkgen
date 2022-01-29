/*
 * @author: Archy
 * @Date: 2022-01-28 15:49:38
 * @LastEditors: Archy
 * @LastEditTime: 2022-01-29 13:24:09
 * @FilePath: \code-generator\server\src\routes\index.ts
 * @description: 
 */
import express from 'express'
const router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) { // eslint-disable-line
  res.render('index', { title: 'Express' })
})

export default router
