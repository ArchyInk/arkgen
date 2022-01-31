"use strict";
/*
 * @Author: Archy
 * @Date: 2022-01-31 21:02:37
 * @LastEditors: Archy
 * @LastEditTime: 2022-01-31 21:25:33
 * @FilePath: \arkgen\server\src\shared\utils.ts
 * @description:
 */
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dirDetail = exports.fileType = exports.isExist = exports.isFile = exports.isDir = void 0;
var fs_extra_1 = require("fs-extra");
var path_1 = require("path");
var isDir = function (path) { return (0, fs_extra_1.lstatSync)(path).isDirectory(); };
exports.isDir = isDir;
var isFile = function (path) { return (0, fs_extra_1.lstatSync)(path).isFile(); };
exports.isFile = isFile;
var isExist = function (path) { return (0, fs_extra_1.accessSync)(path, fs_extra_1.constants.F_OK); };
exports.isExist = isExist;
var fileType = function (path) {
    return (0, exports.isDir)(path) ? 'directory' : (0, exports.isFile)(path) ? 'file' : 'unknown';
};
exports.fileType = fileType;
var dirDetail = function (path) {
    var e_1, _a;
    var names = (0, fs_extra_1.readdirSync)(path);
    var resArr = [];
    try {
        for (var names_1 = __values(names), names_1_1 = names_1.next(); !names_1_1.done; names_1_1 = names_1.next()) {
            var name_1 = names_1_1.value;
            var res = (0, fs_extra_1.statSync)((0, path_1.join)(path, name_1));
            try {
                resArr.push({
                    name: name_1,
                    type: res.isDirectory()
                        ? 'directory'
                        : res.isFile()
                            ? 'file'
                            : 'unknown',
                    info: res,
                });
            }
            catch (err) {
                resArr.push({
                    name: name_1,
                    err: err,
                });
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (names_1_1 && !names_1_1.done && (_a = names_1.return)) _a.call(names_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return resArr;
};
exports.dirDetail = dirDetail;
