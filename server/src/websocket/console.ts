/*
 * @author: Archy
 * @Date: 2022-02-21 16:46:37
 * @LastEditors: Archy
 * @LastEditTime: 2022-02-22 15:07:38
 * @FilePath: \arkgen\server\src\websocket\console.ts
 * @description: 
 */

import { WebSocketServer } from 'ws';
import { exec } from 'child_process'
import { CWD } from '../shared/constants';

export default (server: any) => {
  const wss = new WebSocketServer({ server, path: '/console' })

  wss.on('connection', function connection(ws) {
    ws.on('message', function message(data) {
      try {
        const cp = exec(data.toString(), (error, stdout, stderr) => {
          error && ws.send(JSON.stringify(error))
          stdout && ws.send(JSON.stringify(stdout))
          stderr && ws.send(JSON.stringify(stderr))
        })
        console.log(cp);
      } catch (err) {
        ws.send(JSON.stringify(err))
      }
    });

    ws.send('');
  });
}
