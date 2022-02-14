"use strict";
/*
 * @Author: Archy
 * @Date: 2022-01-31 21:02:37
 * @LastEditors: Archy
 * @LastEditTime: 2022-02-14 16:15:27
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findFileAsync = exports.dirDetail = exports.pathType = exports.isExist = exports.isFile = exports.isDir = void 0;
var fs_extra_1 = require("fs-extra");
var path_1 = require("path");
var constants_1 = require("./constants");
var nanomatch_1 = __importDefault(require("nanomatch"));
/**
 * @description: 判断路径是否为目录
 * @param {string} path
 * @return {boolean}
 */
var isDir = function (path) { return (0, fs_extra_1.lstatSync)(path).isDirectory(); };
exports.isDir = isDir;
/**
 * @description: 判断路径是否为文件
 * @param {string} path
 * @return {boolean}
 */
var isFile = function (path) { return (0, fs_extra_1.lstatSync)(path).isFile(); };
exports.isFile = isFile;
/**
 * @description: 判断路径是否存在
 * @param {string} path
 * @return {boolean}
 */
var isExist = function (path) {
    try {
        (0, fs_extra_1.accessSync)(path, fs_extra_1.constants.F_OK);
        return true;
    }
    catch (err) {
        return false;
    }
};
exports.isExist = isExist;
/**
 * @description: 判断路径类型
 * @param {string} path
 * @return {'directory' | 'file' | 'unknown'}
 */
var pathType = function (path) {
    return (0, exports.isDir)(path) ? 'directory' : (0, exports.isFile)(path) ? 'file' : 'unknown';
};
exports.pathType = pathType;
/**
 * @description: 目录详情，获取目录下所有路径的详情
 * @param {string} path
 * @return {DirsType}
 */
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
                    title: name_1,
                    key: (0, path_1.join)(path, name_1),
                    type: res.isDirectory()
                        ? 'directory'
                        : res.isFile()
                            ? 'file'
                            : 'unknown',
                    isLeaf: res.isFile() ? true : false,
                    info: res,
                });
            }
            catch (err) {
                resArr.push({
                    title: name_1,
                    key: (0, path_1.join)(path, name_1),
                    type: 'error',
                    isLeaf: true,
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
    return resArr.sort(function (a, b) {
        var typeToNum = function (item) {
            return item.type === 'directory' ? 3 : item.type === 'file' ? 2 : item.type === 'unknown' ? 1 : -1;
        };
        return typeToNum(b) - typeToNum(a);
    });
};
exports.dirDetail = dirDetail;
/**
 * @description: 向下查找文件
 * @param {string} filename 文件名,支持通配符
 * @param {{ exclude?: string[]; include?: string[]; cwd?: string }} options exclude 排除的文件夹 include包括的文件夹 cwd搜索的根目录，默认为项目根目录
 * @return {string}
 */
var findFileAsync = function (filename, options) {
    var _cwd = (options === null || options === void 0 ? void 0 : options.cwd) ? options === null || options === void 0 ? void 0 : options.cwd : constants_1.CWD;
    var include = options === null || options === void 0 ? void 0 : options.include;
    var exclude = options === null || options === void 0 ? void 0 : options.exclude;
    var _include = include;
    var find = function (dirPath) {
        var e_2, _a, e_3, _b;
        var names = (0, fs_extra_1.readdirSync)(dirPath);
        var _names = names;
        var _loop_1 = function (name_2) {
            var e_4, _c, e_5, _d;
            var path = (0, path_1.join)(dirPath, name_2);
            if (exclude) {
                try {
                    for (var exclude_1 = (e_4 = void 0, __values(exclude)), exclude_1_1 = exclude_1.next(); !exclude_1_1.done; exclude_1_1 = exclude_1.next()) {
                        var exc = exclude_1_1.value;
                        if (nanomatch_1.default.isMatch(path, (0, path_1.join)(_cwd, exc))) {
                            _names = _names.filter(function (item) { return item !== name_2; });
                            continue;
                        }
                    }
                }
                catch (e_4_1) { e_4 = { error: e_4_1 }; }
                finally {
                    try {
                        if (exclude_1_1 && !exclude_1_1.done && (_c = exclude_1.return)) _c.call(exclude_1);
                    }
                    finally { if (e_4) throw e_4.error; }
                }
            }
            if (_include && _include.length > 0) {
                var _loop_2 = function (inc) {
                    var draft = [];
                    if (nanomatch_1.default.isMatch(path, (0, path_1.join)(_cwd, inc))) {
                        draft.push(name_2);
                        _include = _include.filter(function (item) { return item !== inc; });
                        _names = draft;
                        if ((0, exports.isFile)(path) && nanomatch_1.default.isMatch(path, (0, path_1.join)(dirPath, filename))) {
                            return { value: path };
                        }
                        else {
                            return "continue";
                        }
                    }
                };
                try {
                    for (var _include_1 = (e_5 = void 0, __values(_include)), _include_1_1 = _include_1.next(); !_include_1_1.done; _include_1_1 = _include_1.next()) {
                        var inc = _include_1_1.value;
                        var state_2 = _loop_2(inc);
                        if (typeof state_2 === "object")
                            return state_2;
                    }
                }
                catch (e_5_1) { e_5 = { error: e_5_1 }; }
                finally {
                    try {
                        if (_include_1_1 && !_include_1_1.done && (_d = _include_1.return)) _d.call(_include_1);
                    }
                    finally { if (e_5) throw e_5.error; }
                }
            }
            else {
                if ((0, exports.isFile)(path) && nanomatch_1.default.isMatch(name_2, filename)) {
                    return { value: path };
                }
            }
        };
        try {
            for (var names_2 = __values(names), names_2_1 = names_2.next(); !names_2_1.done; names_2_1 = names_2.next()) {
                var name_2 = names_2_1.value;
                var state_1 = _loop_1(name_2);
                if (typeof state_1 === "object")
                    return state_1.value;
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (names_2_1 && !names_2_1.done && (_a = names_2.return)) _a.call(names_2);
            }
            finally { if (e_2) throw e_2.error; }
        }
        try {
            for (var _names_1 = __values(_names), _names_1_1 = _names_1.next(); !_names_1_1.done; _names_1_1 = _names_1.next()) {
                var name_3 = _names_1_1.value;
                var path = (0, path_1.join)(dirPath, name_3);
                if ((0, exports.isDir)(path)) {
                    var p = find(path);
                    if (p) {
                        return find(path);
                    }
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_names_1_1 && !_names_1_1.done && (_b = _names_1.return)) _b.call(_names_1);
            }
            finally { if (e_3) throw e_3.error; }
        }
    };
    return find(_cwd);
};
exports.findFileAsync = findFileAsync;
