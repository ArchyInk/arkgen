/*
 * @author: Archy
 * @Date: 2022-03-11 14:07:35
 * @LastEditors: Archy
 * @LastEditTime: 2022-03-11 15:28:58
 * @FilePath: \arkgen\react\src\hooks\useCmd.ts
 * @description: 
 */
import { ReadyState, useTerminal } from "./useTerminal"
import { useEffect } from "react"

export const useCmd = () => {
  const [terminal, ws] = useTerminal(import.meta.env.VITE_WS_URL + '/terminal')
  const { latestMessage, readyState, connect, disconnect, sendMessage } = ws
  
  useEffect(() => {
    if (latestMessage?.data === 'PROMPT') {
      readyState === ReadyState.Open && disconnect && disconnect()
    }
  }, [latestMessage])
  
  return (command: string) => {
    readyState !== ReadyState.Open && connect && connect()
    terminal.write(command)
    sendMessage && sendMessage(command)
    terminal.writeln('')
  }
}