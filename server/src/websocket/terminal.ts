/*
 * @author: Archy
 * @Date: 2022-02-21 16:46:37
 * @LastEditors: Archy
 * @LastEditTime: 2022-03-10 15:49:58
 * @FilePath: \arkgen\server\src\websocket\terminal.ts
 * @description: 
 */

import { WebSocketServer } from 'ws';
import PrettyError from 'pretty-error'
const pe = new PrettyError()
import { transformEncode } from '../shared/utils';
import execa from 'execa'
import http from 'http'
import { CWD } from '../shared/constants';
import { join } from 'path';

class Cwd {
  private _cwd: string
  constructor() {
    this._cwd = CWD
  }

  set cwd(_cwd: string) {
    this._cwd = _cwd
  }

  get cwd() {
    return this._cwd
  }
}

export default (server: http.Server) => {
  const wss = new WebSocketServer({ server, path: '/terminal' })

  const cwd = new Cwd()

  let child: execa.ExecaChildProcess<string> | null = null

  wss.on('connection', (ws) => {
    ws.send(`cwdchange&${cwd.cwd}`)
    ws.send('PROMPT')
    ws.on('message', async (data) => {
      try {
        child = execa.command(data.toString(), { encoding: 'binary', cwd: cwd.cwd, stdio: ['inherit', 'pipe', 'pipe'], })
        if (data.toString().split(' ')[0].toLocaleLowerCase() === 'cd') {
          cwd.cwd = join(cwd.cwd, data.toString().split(' ')[1])
          ws.send(`cwdchange&${cwd.cwd}`)
        }

        child.stdout.on('data', (buffer) => {
          ws.send(transformEncode(buffer))
        })

        child.stderr.on('data', (buffer) => {
          ws.send(transformEncode(buffer))
        })

        child.on('exit', () => {
          ws.send('PROMPT')
        })
      } catch (err) {
        const stderr = transformEncode(pe.render(err))
        ws.send(stderr)
      }
    });

    ws.on('close', () => {
      cwd.cwd = CWD
      child && child.cancel()
      ws.send('connect close...')
    })
  });
}
