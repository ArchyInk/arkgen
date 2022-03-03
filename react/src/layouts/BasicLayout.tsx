/*
 * @Author: Archy
 * @Date: 2022-01-30 09:16:43
 * @LastEditors: Archy
 * @LastEditTime: 2022-03-03 15:31:59
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
import { TerminalButton, Terminal } from '../components/terminal'
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
        <TerminalButton collapsed={collapsed} visible={visible} onOpen={() => { setVisible(true) }} onClose={() => { setVisible(false) }} style={{ position: 'absolute', bottom: '20px' }}></TerminalButton>
      </Sider>
      <Layout>
        <Content><Outlet /></Content>
      </Layout>
      <Terminal visible={visible} onClose={() => { setVisible(false) }} style={{ left: 12 + width, bottom: 14 }}></Terminal>
    </Layout>
  )
}

export default BasicLayout