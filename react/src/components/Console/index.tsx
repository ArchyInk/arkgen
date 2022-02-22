/*
 * @author: Archy
 * @Date: 2022-02-21 11:55:40
 * @LastEditors: Archy
 * @LastEditTime: 2022-02-22 15:01:29
 * @FilePath: \arkgen\react\src\components\Console\index.tsx
 * @description: 
 */

import React, { useEffect, useState } from "react"
import { Menu } from 'antd'
import Icon from '@ant-design/icons'
export { default as Console } from './console'
import './index.less'
interface ConsoleMenuProps {
  collapsed: Boolean,
  onOpen?: () => void,
  onClose?: () => void,
  style?: React.CSSProperties
}

const consoleSvg: React.FC = () => <svg className="icon" viewBox="0 0 1024 1024" version="1.1" width="1em" fill="currentColor" height="1em" xmlns="http://www.w3.org/2000/svg" p-id="4114"><path d="M0 833.6c0 70.4 56 123.2 128 123.2h768c72 0 128-52.8 128-123.2V380.8H0v452.8z m716.8-267.2c-12.8-12.8-17.6-28.8-4.8-41.6s30.4-16 43.2-4.8l128 102.4c8 3.2 12.8 11.2 12.8 20.8-1.6 8-4.8 17.6-8 25.6l-128 118.4c-12.8 11.2-30.4 11.2-43.2 0-12.8-12.8-12.8-33.6 0-41.6l102.4-94.4-102.4-84.8zM417.6 747.2l128-222.4c8-16 25.6-20.8 43.2-12.8s20.8 25.6 12.8 41.6l-128 222.4c-6.4 9.6-16 14.4-25.6 16-4.8 0-12.8 0-17.6-4.8-12.8-8-20.8-24-12.8-40z m-276.8-128l128-102.4c12.8-11.2 32-9.6 43.2 3.2 9.6 9.6 9.6 27.2 1.6 36.8l-4.8 4.8-102.4 81.6 102.4 94.4c11.2 8 12.8 25.6 4.8 36.8l-4.8 4.8c-12.8 11.2-30.4 11.2-43.2 0l-128-118.4c-6.4-6.4-9.6-16-8-25.6-1.6-3.2 1.6-8 11.2-16zM894.4 67.2H128c-72 0-128 52.8-128 123.2v123.2h1022.4v-123.2c0-70.4-54.4-123.2-128-123.2zM212.8 232H128V148.8h84.8v83.2z m171.2 0h-84.8V148.8H384v83.2z m169.6 0h-84.8V148.8h84.8v83.2z m0 0" p-id="4115"></path></svg>

export const ConsoleButton: React.FC<ConsoleMenuProps> = (props) => {
  const [visible, setVisible] = useState<boolean>(false)
  const [selectedKeys, setSelectedKeys] = useState<Array<string>>([])
  const iconStyle = { color: '#777777', fontSize: '18px' }

  useEffect(() => {
    visible ? props.onOpen?.() : props.onClose?.()
  }, [visible])

  const handleClick = () => {
    setSelectedKeys(selectedKeys[0] ? [] : ["console"])
    setVisible(!visible)
  }

  const renderMenuItem = (title: string) => {
    return (<div className='sidermenu__item' >{props.collapsed ? title : ''}</div>)
  }
  return (
    <div>
      <Menu mode="inline" onClick={handleClick} className={`${props.collapsed ? 'sidermenu--collapsed' : ''}`} style={props.style} selectedKeys={selectedKeys}>
        <Menu.Item key="console" icon={<Icon component={consoleSvg} style={iconStyle} />}>
          {renderMenuItem('控制台')}
        </Menu.Item>
      </Menu>
    </div>
  )
}
