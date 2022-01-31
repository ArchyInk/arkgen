"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author: Archy
 * @Date: 2022-01-30 11:49:29
 * @LastEditors: Archy
 * @LastEditTime: 2022-01-31 15:59:50
 * @FilePath: \arkgen\server\src\routes\error.ts
 * @description:
 */
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
router.use(function timeLog(req, res, next) {
    res.status(404).send('Sorry, we cannot find that!');
    next();
});
exports.default = router;
