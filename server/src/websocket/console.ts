/*
 * @author: Archy
 * @Date: 2022-02-21 16:46:37
 * @LastEditors: Archy
 * @LastEditTime: 2022-03-03 09:55:59
 * @FilePath: \arkgen\server\src\websocket\console.ts
 * @description: 
 */

import { WebSocketServer } from 'ws';
import { execaShims } from '../shared/utils';

export default (server: any) => {
  const wss = new WebSocketServer({ server, path: '/console' })

  wss.on('connection', function connection(ws) {
    ws.on('message', async (data) => {
      ws.send(data.toString())
      const { stdout, stderr } = await execaShims(data.toString())
      stdout.split(/\r?\n/).map((line) => {
        ws.send(line)
      })

      stderr.split(/\r?\n/).map((line) => {
        ws.send(line)
      })
    });
  });
}
