/*
 * @Author: Archy
 * @Date: 2022-01-30 17:58:04
 * @LastEditors: Archy
 * @LastEditTime: 2022-02-21 16:05:28
 * @FilePath: \arkgen\react\src\components\Menu\index.tsx
 * @description: 
 */
import React, { useEffect, useState } from 'react'
import { Menu } from 'antd'
import { Link, useLocation } from 'react-router-dom'
import { HomeFilled, CodepenSquareFilled, FolderOpenFilled } from '@ant-design/icons'

interface SiderMenuProps {
  collapsed: Boolean
}


const SiderMenu: React.FC<SiderMenuProps> = (props) => {
  const location = useLocation()
  const iconStyle = { color: '#777777', fontSize: '18px' }
  const [selectedKeys, setSelectedKeys] = useState(['/home'])

  const renderMenuItemLink = (title: string, to: string) => {
    return (<Link to={to} className='sidermenu__item'>{props.collapsed ? title : ''}</Link>)
  }

  useEffect(() => {
    setSelectedKeys([location.pathname])
  }, [location])


  return (
    <>
      <Menu mode="inline" defaultSelectedKeys={['/home']} className={`${props.collapsed ? 'sidermenu--collapsed' : ''}`} selectedKeys={selectedKeys}>
        <Menu.Item key="/home" icon={<HomeFilled style={iconStyle} />}>
          {renderMenuItemLink('首页', '/home')}
        </Menu.Item>
        <Menu.Item key="/project" icon={<FolderOpenFilled style={{ ...iconStyle, marginLeft: '1px' }} />}>
          {renderMenuItemLink('项目', '/project')}
        </Menu.Item>
        <Menu.Item key="/generator" icon={<CodepenSquareFilled style={iconStyle} />}>
          {renderMenuItemLink('代码生成', '/generator')}
        </Menu.Item>
      </Menu>
    </>)
}

export default SiderMenu