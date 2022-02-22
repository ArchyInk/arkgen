/*
 * @Author: Archy
 * @Date: 2022-01-30 09:16:43
 * @LastEditors: Archy
 * @LastEditTime: 2022-02-22 14:52:44
 * @FilePath: \arkgen\react\src\layouts\BasicLayout.tsx
 * @description: 
 */
import React, { MouseEvent, useState } from 'react'
import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'
import { appState } from '../stores/app'
import { useRecoilState } from 'recoil'
import './BasicLayout.less'
import Menu from '../components/Menu'
import { ConsoleButton, Console } from '../components/Console'
const { Sider, Content } = Layout
const BasicLayout: React.FC = () => {
  const [app, setApp] = useRecoilState(appState)
  const [visible, setVisible] = useState<boolean>(false)
  const [width, setWidth] = useState(64)
  const [collapsed, setCollapsed] = useState(false)
  const handleMouseenter = (e: MouseEvent) => {
    setWidth(168)
    setCollapsed(true)
  }

  const handleMouselevel = (e: MouseEvent) => {
    setWidth(64)
    setCollapsed(false)
  }

  return (
    <Layout className='arkgen-layout'>
      <Sider
        theme={app.theme}
        collapsed={false}
        trigger={null}
        width={width}
        onMouseEnter={handleMouseenter}
        onMouseLeave={handleMouselevel}

      >
        <Menu collapsed={collapsed}></Menu>
        <ConsoleButton collapsed={collapsed} onOpen={() => { setVisible(true) }} onClose={() => { setVisible(false) }} style={{ position: 'absolute', bottom: '20px' }}></ConsoleButton>
      </Sider>
      <Layout>
        <Content><Outlet /></Content>
      </Layout>
      <Console visible={visible} style={{ left: 12 + width, bottom: 14 }}></Console>
    </Layout>
  )
}

export default BasicLayout