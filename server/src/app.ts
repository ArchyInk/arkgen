/*
 * @author: Archy
 * @Date: 2022-01-28 15:49:38
 * @LastEditors: Archy
 * @LastEditTime: 2022-01-31 15:44:36
 * @FilePath: \arkgen\server\src\app.ts
 * @description:
 */
import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'

import generatorRouter from './routes/generator'
import projectRouter from './routes/project'
import errorRouter from './routes/error'

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '../web')))

app.use('/project', projectRouter)
app.use('/generator', generatorRouter)
app.use(errorRouter)

module.exports = app
