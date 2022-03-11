/*
 * @author: Archy
 * @Date: 2022-02-21 16:59:33
 * @LastEditors: Archy
 * @LastEditTime: 2022-03-11 15:20:34
 * @FilePath: \arkgen\react\src\components\terminal\terminal.tsx
 * @description: 
 */
import React, { useEffect, useRef, useState } from 'react';
import { useMount, useUnmount } from 'ahooks';
import { Button } from 'antd'
import { CloseOutlined, ClearOutlined } from '@ant-design/icons'
import './terminal.less'
import 'xterm/css/xterm.css'
import { ReadyState, useTerminal } from '../../hooks/useTerminal';


interface TerminalProps {
  onClose?: (e?: React.MouseEvent<HTMLElement>) => void
  onClear?: (e?: React.MouseEvent<HTMLElement>) => void
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
  const terminalRef = useRef<HTMLDivElement>(null)
  const [terminal, ws, setTerminal] = useTerminal(import.meta.env.VITE_WS_URL + '/terminal')
  const [visible, setVisible] = useState<boolean>(false)
  const { readyState, disconnect, connect } = ws
  useMount(() => {
    setTerminal(terminalRef.current as HTMLDivElement)
  })

  useUnmount(() => {
    disconnect && disconnect()
  })

  useEffect(() => {
    setVisible(props.visible ?? false)
    if (props.visible) {
      readyState !== ReadyState.Open && connect && connect()
    }
  }, [props.visible])

  const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    setVisible(false)
    props.onClose?.call(this, e)
  }

  const handleClear = (e: React.MouseEvent<HTMLButtonElement>) => {
    terminal.clear()
    props.onClear?.call(this, e)
  }

  return (
    <div style={{ display: visible ? 'block' : 'none', ...Object.assign({}, defaultProps.style, props.style) }} className="terminal__container">
      <div style={{ display: 'flex', justifyContent: 'flex-end', ...Object.assign({}, defaultProps.headerStyle, props.headerStyle) }}>
        <Button size="small" style={{ margin: 4 }} ghost onClick={handleClear} icon={<ClearOutlined />} />
        <Button size="small" style={{ margin: 4 }} ghost onClick={handleClose} icon={<CloseOutlined />} />
      </div>
      <div id='terminal' ref={terminalRef} className="terminal__body" style={{ ...Object.assign({}, defaultProps.bodyStyle, props.bodyStyle) }}></div>
    </div >)
}

Terminal.defaultProps = defaultProps

export default Terminal