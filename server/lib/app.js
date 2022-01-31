"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @author: Archy
 * @Date: 2022-01-28 15:49:38
 * @LastEditors: Archy
 * @LastEditTime: 2022-01-31 15:44:36
 * @FilePath: \arkgen\server\src\app.ts
 * @description:
 */
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var morgan_1 = __importDefault(require("morgan"));
var generator_1 = __importDefault(require("./routes/generator"));
var project_1 = __importDefault(require("./routes/project"));
var error_1 = __importDefault(require("./routes/error"));
var app = (0, express_1.default)();
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, '../web')));
app.use('/project', project_1.default);
app.use('/generator', generator_1.default);
app.use(error_1.default);
module.exports = app;
