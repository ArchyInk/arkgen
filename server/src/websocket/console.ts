/*
 * @author: Archy
 * @Date: 2022-02-21 16:46:37
 * @LastEditors: Archy
 * @LastEditTime: 2022-02-21 17:19:10
 * @FilePath: \arkgen\server\src\websocket\console.ts
 * @description: 
 */

import { WebSocketServer } from 'ws';

export default (port: number) => {
  const wss = new WebSocketServer({ port: port })

  wss.on('connection', function connection(ws) {
    ws.on('message', function message(data) {
      console.log('received: %s', data);
    });

    ws.send('something');
  });
}
