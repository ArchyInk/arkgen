/*
 * @Author: Archy
 * @Date: 2022-01-30 11:49:29
 * @LastEditors: Archy
 * @LastEditTime: 2022-01-31 15:59:50
 * @FilePath: \arkgen\server\src\routes\error.ts
 * @description:
 */
import express from 'express'
const router = express.Router()

router.use(function timeLog (req, res, next) {
  res.status(404).send('Sorry, we cannot find that!')
  next()
})

export default router