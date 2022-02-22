/*
 * @author: Archy
 * @Date: 2022-02-21 16:59:33
 * @LastEditors: Archy
 * @LastEditTime: 2022-02-22 16:59:16
 * @FilePath: \arkgen\react\src\components\Console\console.tsx
 * @description: 
 */
import React, { useRef, useMemo, useState, KeyboardEvent } from 'react';
import { useWebSocket } from 'ahooks';
import { Input } from 'antd'
import { RightOutlined } from '@ant-design/icons'
import './console.less'

enum ReadyState {
  Connecting = 0,
  Open = 1,
  Closing = 2,
  Closed = 3,
}

interface ConsoleProps {
  visible?: boolean,
  style?: React.CSSProperties,
  height?: number,
  width?: number
}

const defaultProps: ConsoleProps = {
  visible: false,
  height: 300,
  width: 500,
  style: { position: 'fixed', left: 0, bottom: 0, background: '#1e1e1e', wordBreak: 'break-word', color: '#b6b6b6', overflow: 'auto' }
}

const Console: React.FC<ConsoleProps> = (props) => {
  const consoleContent = useRef<any[]>([]);
  const [consoleInput, setConsoleInput] = useState('')
  const { readyState, sendMessage, latestMessage, disconnect, connect } = useWebSocket(
    import.meta.env.VITE_WS_URL + '/console',
  )

  consoleContent.current = useMemo(
    () => {
      let draft: MessageEvent<any> | string[] | undefined = []
      switch (readyState) {
        case ReadyState.Connecting: draft = ['正在打开终端……']; break;
        case ReadyState.Closing: draft = ['正在关闭终端……']; break;
        case ReadyState.Closed: draft = ['终端已关闭。']; break;
        case ReadyState.Open: draft = latestMessage; break;
      }
      return consoleContent.current.concat(draft)
    },
    [latestMessage],
  )

  const handlePressEnter = (e: any) => {
    let { value } = e.target
    if (value && sendMessage) {
      sendMessage(value)
      setConsoleInput('')
    }
  }



  return (<>
    {props.visible ? (
      <div className='console' style={{ height: props.height, width: props.width, zIndex: 999, ...Object.assign(defaultProps.style, props.style) }}>
        {consoleContent.current.map((message, index) => {
          return <p key={index}>{message?.data}</p>
        })}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <RightOutlined />
          <Input value={consoleInput} placeholder='输入命令' bordered={false} onPressEnter={handlePressEnter} onChange={(e) => { setConsoleInput(e.target.value) }} style={{ color: 'white' }}></Input>
        </div>
      </div>
    ) : null}
  </>)

}

Console.defaultProps = defaultProps

export default Console