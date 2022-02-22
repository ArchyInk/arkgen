/*
 * @author: Archy
 * @Date: 2022-02-21 16:46:37
 * @LastEditors: Archy
 * @LastEditTime: 2022-02-22 17:12:37
 * @FilePath: \arkgen\server\src\websocket\console.ts
 * @description: 
 */

import { WebSocketServer } from 'ws';
import { exec } from 'child_process';

export default (server: any) => {
  const wss = new WebSocketServer({ server, path: '/console' })

  wss.on('connection', function connection(ws) {
    ws.on('message', function message(data) {
      try {
        exec(data.toString(), { encoding: 'utf8' }, (error, stdout, stderr) => {
          ws.send(data.toString())
          if (error) {
            error.stack.toString().split(/\r?\n/).map((line) => {
              ws.send(line)
            })
            return
          }
          stdout.split(/\r?\n/).map((line) => {
            ws.send(line)
          })
          stderr.split(/\r?\n/).map((line) => {
            ws.send(line)
          })
        })
      } catch (err) {
        err.stack.toString().split(/\r?\n/).map((line) => {
          ws.send(line)
        })
      }
    });

    ws.send('');
  });
}
