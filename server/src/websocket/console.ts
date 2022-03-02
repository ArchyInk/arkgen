/*
 * @author: Archy
 * @Date: 2022-02-21 16:46:37
 * @LastEditors: Archy
 * @LastEditTime: 2022-03-02 16:54:56
 * @FilePath: \arkgen\server\src\websocket\console.ts
 * @description: 
 */

import { WebSocketServer } from 'ws';
import execa from 'execa';
import iconv, { encode } from 'iconv-lite'

export default (server: any) => {
  const wss = new WebSocketServer({ server, path: '/console' })

  wss.on('connection', function connection(ws) {
    ws.on('message', async (data) => {
      ws.send(data.toString())
      const { stdout, stderr } = await execa.command("echo 测试", { encoding: 'binary' })
      console.log(`stdout:${stdout}`);
      const result = iconv.decode(Buffer.from(stdout, 'binary'), 'cp936')
      // const error = iconv.decode(Buffer.from(stderr, 'binary'), 'cp936')
      // console.log('result:');
      // console.log(result);
      // console.log('error:');
      // console.log(error);
      console.log(result);
      result.split(/\r?\n/).map((line) => {
        console.log(line);
        ws.send(line)
      })
    });
  });
}
