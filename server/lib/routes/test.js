"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author: Archy
 * @Date: 2022-01-30 11:49:29
 * @LastEditors: Archy
 * @LastEditTime: 2022-01-30 11:52:38
 * @FilePath: \arkgen\server\src\routes\test.ts
 * @description:
 */
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
router.get('/', function (req, res, next) {
    // eslint-disable-line
    res.send('express test');
});
exports.default = router;
