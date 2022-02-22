"use strict";
/*
 * @author: Archy
 * @Date: 2022-02-21 16:46:37
 * @LastEditors: Archy
 * @LastEditTime: 2022-02-22 17:12:37
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
                (0, child_process_1.exec)(data.toString(), { encoding: 'utf8' }, function (error, stdout, stderr) {
                    ws.send(data.toString());
                    if (error) {
                        error.stack.toString().split(/\r?\n/).map(function (line) {
                            ws.send(line);
                        });
                        return;
                    }
                    stdout.split(/\r?\n/).map(function (line) {
                        ws.send(line);
                    });
                    stderr.split(/\r?\n/).map(function (line) {
                        ws.send(line);
                    });
                });
            }
            catch (err) {
                err.stack.toString().split(/\r?\n/).map(function (line) {
                    ws.send(line);
                });
            }
        });
        ws.send('');
    });
});
