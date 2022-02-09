/*
 * @Author: Archy
 * @Date: 2022-01-30 16:56:40
 * @LastEditors: Archy
 * @LastEditTime: 2022-02-09 21:20:54
 * @FilePath: \arkgen\react\src\router\index.tsx
 * @description:
 */
import BasicLayout from '../layouts/BasicLayout'
import Home from '../pages/home'
import Project from '../pages/project'
import Generator from '../pages/generator'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import React, { useEffect } from 'react'

const Router: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    location.pathname === '/' && navigate('/home', { replace: true })
  }, [])
  return (
    <Routes>
      <Route path="/" element={<BasicLayout />}>
        <Route path="home" element={<Home />}></Route>
        <Route path="project" element={<Project />}></Route>
        <Route path="generator" element={<Generator />}></Route>
      </Route>
    </Routes>
  )
}

export default Router
