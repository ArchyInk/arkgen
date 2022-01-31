"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @author: Archy
 * @Date: 2022-01-28 15:49:38
 * @LastEditors: Archy
 * @LastEditTime: 2022-01-29 13:24:19
 * @FilePath: \code-generator\server\src\routes\users.ts
 * @description:
 */
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var _a = require('fs-extra'), readFileSync = _a.readFileSync, writeFileSync = _a.writeFileSync;
router.get('/', function (req, res, next) {
    var text = readFileSync('./index.js', 'utf-8');
    writeFileSync('test.js', 'test', 'utf-8');
    res.send(text);
});
exports.default = router;
