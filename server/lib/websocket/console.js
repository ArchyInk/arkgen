"use strict";
/*
 * @author: Archy
 * @Date: 2022-02-21 16:46:37
 * @LastEditors: Archy
 * @LastEditTime: 2022-02-21 17:19:10
 * @FilePath: \arkgen\server\src\websocket\console.ts
 * @description:
 */
Object.defineProperty(exports, "__esModule", { value: true });
var ws_1 = require("ws");
exports.default = (function (port) {
    var wss = new ws_1.WebSocketServer({ port: port });
    wss.on('connection', function connection(ws) {
        ws.on('message', function message(data) {
            console.log('received: %s', data);
        });
        ws.send('something');
    });
});
