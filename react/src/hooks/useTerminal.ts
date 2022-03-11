/*
 * @author: Archy
 * @Date: 2022-03-11 13:28:16
 * @LastEditors: Archy
 * @LastEditTime: 2022-03-11 15:22:20
 * @FilePath: \arkgen\react\src\hooks\useTerminal.ts
 * @description: terminal控制台的hooks
 */
import { Terminal, ITerminalOptions } from "xterm";
import { useRef, useEffect } from "react";
import { useWebSocket } from "ahooks";
import { Result } from "ahooks/lib/useWebSocket";

const terminalIns = new Terminal({
  rendererType: 'canvas',
  convertEol: true,
  scrollback: 50,
  disableStdin: false,
  cursorStyle: 'underline',
  cursorBlink: true,
  theme: {
    foreground: '#f0f0f0',
    background: '#002833',
    cursor: 'help',
  }
})

export enum ReadyState {
  Connecting = 0,
  Open = 1,
  Closing = 2,
  Closed = 3,
}

/**
 * @description: 
 * @param {*} url websocket url
 * @return {*}
 */
export const useTerminal = (url: string): [Terminal, Result, (dom: HTMLDivElement) => void] => {
  const terminal = useRef<Terminal>(terminalIns)
  const ws = useWebSocket(
    url, { manual: true }
  )

  const { sendMessage, latestMessage } = ws
  const inputMessage = useRef<string>('')
  const cwd = useRef<string>('')

  const prompt = () => {
    inputMessage.current = ''
    terminal.current.write(`\r\n${cwd.current ?? ''}> `);
  }

  useEffect(() => {
    terminal.current.onData(e => {
      switch (e) {
        case '\u0003':
          terminal.current.write('^C');
          break;
        case '\r':
          if (inputMessage.current) {
            sendMessage && sendMessage(inputMessage.current)
            terminal.current.writeln('')
          } else {
            prompt()
          }
          break;
        case '\u007F':
          if (inputMessage.current.length > 0) {
            terminal.current.write('\b \b');
            inputMessage.current = inputMessage.current.substring(0, inputMessage.current.length - 1);
          }
          break;
        default:
          if (e >= String.fromCharCode(0x20) && e <= String.fromCharCode(0x7B) || e >= '\u00a0') {
            terminal.current.write(e)
            inputMessage.current += e
          }
      }
    });
  }, [])


  useEffect(() => {
    if (latestMessage?.data?.split('&')[0] === 'cwdchange') {
      cwd.current = latestMessage.data?.split('&')[1]
      return
    }
    if (latestMessage?.data === 'PROMPT') {
      prompt()
      return
    }

    if (latestMessage?.data !== undefined) {
      terminal.current.writeln(latestMessage?.data)
    }
  }, [latestMessage])

  const setTerminal = (dom: HTMLDivElement) => {
    terminal.current.open(dom)
  }

  return [terminal.current, ws, setTerminal]
}

export const useGetTerminal = (url: string) => {
  const [terminal] = useTerminal(url)
  return terminal
}
