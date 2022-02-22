"use strict";
/*
 * @author: Archy
 * @Date: 2022-02-21 16:46:37
 * @LastEditors: Archy
 * @LastEditTime: 2022-02-22 15:07:38
 * @FilePath: \arkgen\server\src\websocket\console.ts
 * @description:
 */
Object.defineProperty(exports, "__esModule", { value: true });
var ws_1 = require("ws");
var child_process_1 = require("child_process");
exports.default = (function (server) {
    var wss = new ws_1.WebSocketServer({ server: server, path: '/console' });
    wss.on('connection', function connection(ws) {
        ws.on('message', function message(data) {
            try {
                var cp = (0, child_process_1.exec)(data.toString(), function (error, stdout, stderr) {
                    error && ws.send(JSON.stringify(error));
                    stdout && ws.send(JSON.stringify(stdout));
                    stderr && ws.send(JSON.stringify(stderr));
                });
                console.log(cp);
            }
            catch (err) {
                ws.send(JSON.stringify(err));
            }
        });
        ws.send('');
    });
});
