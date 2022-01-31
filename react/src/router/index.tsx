/*
 * @Author: Archy
 * @Date: 2022-01-30 16:56:40
 * @LastEditors: Archy
 * @LastEditTime: 2022-01-30 20:33:44
 * @FilePath: \arkgen\react\src\router\index.tsx
 * @description:
 */
import BasicLayout from '../layouts/BasicLayout'
import Home from '../pages/home'
import Project from '../pages/project'
import Generator from '../pages/generator'
import { Routes, Route } from 'react-router-dom'
import React from 'react'

const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<BasicLayout />} >
        <Route path="home" element={<Home />}></Route>
        <Route path="project" element={<Project />}></Route>
        <Route path="generator" element={<Generator />}></Route>
      </Route>
    </Routes>
  )
}

export default Router
