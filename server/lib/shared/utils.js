"use strict";
/*
 * @Author: Archy
 * @Date: 2022-01-31 21:02:37
 * @LastEditors: Archy
 * @LastEditTime: 2022-02-09 23:36:17
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
exports.findFileAsync = exports.dirDetail = exports.fileType = exports.isExist = exports.isFile = exports.isDir = void 0;
var fs_extra_1 = require("fs-extra");
var path_1 = require("path");
var constants_1 = require("./constants");
var nanomatch_1 = __importDefault(require("nanomatch"));
var isDir = function (path) { return (0, fs_extra_1.lstatSync)(path).isDirectory(); };
exports.isDir = isDir;
var isFile = function (path) { return (0, fs_extra_1.lstatSync)(path).isFile(); };
exports.isFile = isFile;
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
var findFileAsync = function (filename, options) {
    var _cwd = (options === null || options === void 0 ? void 0 : options.cwd) ? options === null || options === void 0 ? void 0 : options.cwd : constants_1.CWD;
    var _include = options === null || options === void 0 ? void 0 : options.include;
    var _exclude = options === null || options === void 0 ? void 0 : options.exclude;
    var find = function (dirPath) {
        var e_2, _a, e_3, _b, e_4, _c, e_5, _d;
        var filePath = (0, path_1.join)(dirPath, filename);
        var names = (0, fs_extra_1.readdirSync)(dirPath);
        if (_include) {
            var draft = [];
            try {
                for (var _include_1 = __values(_include), _include_1_1 = _include_1.next(); !_include_1_1.done; _include_1_1 = _include_1.next()) {
                    var inc = _include_1_1.value;
                    var matchs = nanomatch_1.default.match(names, inc);
                    draft = draft.concat(nanomatch_1.default.match(names, inc));
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_include_1_1 && !_include_1_1.done && (_a = _include_1.return)) _a.call(_include_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
            names = draft;
        }
        if (options === null || options === void 0 ? void 0 : options.exclude) {
            try {
                for (var _e = __values(options.exclude), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var exc = _f.value;
                    names = nanomatch_1.default.not(names, exc);
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                }
                finally { if (e_3) throw e_3.error; }
            }
        }
        try {
            for (var names_2 = __values(names), names_2_1 = names_2.next(); !names_2_1.done; names_2_1 = names_2.next()) {
                var name_2 = names_2_1.value;
                var path = (0, path_1.join)(dirPath, name_2);
                console.log(filename);
                console.log(name_2);
                console.log(nanomatch_1.default.isMatch(name_2, filename));
                if ((0, exports.isFile)(path) && nanomatch_1.default.isMatch(name_2, filename)) {
                    return path;
                }
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (names_2_1 && !names_2_1.done && (_c = names_2.return)) _c.call(names_2);
            }
            finally { if (e_4) throw e_4.error; }
        }
        try {
            for (var names_3 = __values(names), names_3_1 = names_3.next(); !names_3_1.done; names_3_1 = names_3.next()) {
                var name_3 = names_3_1.value;
                var path = (0, path_1.join)(dirPath, name_3);
                (0, exports.isDir)(path) && find(path);
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (names_3_1 && !names_3_1.done && (_d = names_3.return)) _d.call(names_3);
            }
            finally { if (e_5) throw e_5.error; }
        }
    };
    return find(_cwd);
};
exports.findFileAsync = findFileAsync;
