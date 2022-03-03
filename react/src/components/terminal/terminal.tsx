/*
 * @author: Archy
 * @Date: 2022-02-21 16:59:33
 * @LastEditors: Archy
 * @LastEditTime: 2022-03-03 15:40:52
 * @FilePath: \arkgen\react\src\components\terminal\terminal.tsx
 * @description: 
 */
import React, { useEffect, useRef, useState } from 'react';
import { useMount } from 'ahooks';
import { Button } from 'antd'
import { CloseOutlined, ClearOutlined } from '@ant-design/icons'

import { Terminal as Xterm } from 'xterm';
import './terminal.less'
import 'xterm/css/xterm.css'

enum ReadyState {
  Connecting = 0,
  Open = 1,
  Closing = 2,
  Closed = 3,
}

interface TerminalProps {
  onClose?: (e?: React.MouseEvent<HTMLElement>) => void
  visible?: boolean,
  style?: React.CSSProperties,
  bodyStyle?: React.CSSProperties,
  headerStyle?: React.CSSProperties,
  height?: number,
  width?: number,
}

const defaultProps: TerminalProps = {
  visible: false,
  height: 300,
  width: 500,
  style: { position: 'fixed', left: 0, bottom: 0, background: '#1e1e1e', wordBreak: 'break-word', color: '#b6b6b6', overflow: 'auto' },
}

const Terminal: React.FC<TerminalProps> = (props) => {
  const [visible, setVisible] = useState<boolean>(false)
  const terminalRef = useRef<HTMLDivElement>(null)
  const term = new Xterm({
    rendererType: 'canvas', // 渲染类型
    convertEol: true, // 启用时，光标将设置为下一行的开头
    scrollback: 50, // 终端中的回滚量
    disableStdin: false, // 是否应禁用输入。
    cursorStyle: 'underline', // 光标样式
    cursorBlink: true, // 光标闪烁
    theme: {
      foreground: '#7e9192', // 字体
      background: '#002833', // 背景色
      cursor: 'help', // 设置光标
    }
  })

  useMount(() => {
    term.open(terminalRef.current as HTMLElement)
  })

  useEffect(() => {
    setVisible(props.visible ?? false)
  }, [props.visible])

  const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    setVisible(false)
    props.onClose?.call(this, e)
  }


  return (
    <div style={{ display: visible ? 'block' : 'none', ...Object.assign({}, defaultProps.style, props.style) }} className="terminal__container">
      <div style={{ display: 'flex', justifyContent: 'flex-end', ...Object.assign({}, defaultProps.headerStyle, props.headerStyle) }}>
        <Button size="small" icon={<CloseOutlined />} />
        <Button size="small" style={{margi}} icon={<ClearOutlined />} />
        <Button size="small" onClick={handleClose} icon={<CloseOutlined />} />
      </div>
      <div id='terminal' ref={terminalRef} className="terminal__body" style={{ ...Object.assign({}, defaultProps.bodyStyle, props.bodyStyle) }}></div>
    </div >)

}

Terminal.defaultProps = defaultProps

export default Terminal