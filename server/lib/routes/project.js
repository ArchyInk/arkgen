"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author: Archy
 * @Date: 2022-01-31 11:27:01
 * @LastEditors: Archy
 * @LastEditTime: 2022-02-21 11:10:52
 * @FilePath: \arkgen\server\src\routes\project.ts
 * @description:
 */
var express_1 = __importDefault(require("express"));
var fs_extra_1 = require("fs-extra");
var ext2lang_1 = __importDefault(require("ext2lang"));
var path_1 = require("path");
var find_up_1 = __importDefault(require("find-up"));
var constants_1 = require("../shared/constants");
var Response_1 = __importDefault(require("../class/Response"));
var utils_1 = require("../shared/utils");
var router = express_1.default.Router();
router.get('/', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var resp, draft, findPkg, findViteConfig, _a, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                resp = new Response_1.default();
                draft = {
                    path: constants_1.CWD,
                    dirs: []
                };
                findPkg = function () { return __awaiter(void 0, void 0, void 0, function () {
                    var pkgPath, pkg;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, (0, find_up_1.default)('package.json')];
                            case 1:
                                pkgPath = _a.sent();
                                if (pkgPath) {
                                    draft.hasPkg = true;
                                    pkg = (0, fs_extra_1.readFileSync)(pkgPath, 'utf-8');
                                    draft.pkg = pkg;
                                }
                                else {
                                    draft.hasPkg = false;
                                }
                                return [2 /*return*/];
                        }
                    });
                }); };
                findViteConfig = function () { return __awaiter(void 0, void 0, void 0, function () {
                    var vitePath, viteConfig;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, (0, find_up_1.default)(['vite.config.ts', 'vite.config.js'])];
                            case 1:
                                vitePath = _a.sent();
                                if (vitePath) {
                                    draft.hasViteConfig = true;
                                    viteConfig = (0, fs_extra_1.readFileSync)(vitePath, 'utf-8');
                                    draft.viteConfig = viteConfig;
                                }
                                else {
                                    draft.hasViteConfig = false;
                                }
                                return [2 /*return*/];
                        }
                    });
                }); };
                _b.label = 1;
            case 1:
                _b.trys.push([1, 5, , 6]);
                return [4 /*yield*/, findPkg()];
            case 2:
                _b.sent();
                return [4 /*yield*/, findViteConfig()];
            case 3:
                _b.sent();
                _a = draft;
                return [4 /*yield*/, (0, utils_1.dirDetail)(constants_1.CWD)];
            case 4:
                _a.dirs = _b.sent();
                resp.setRes('获取项目详情成功！', true, draft);
                return [3 /*break*/, 6];
            case 5:
                err_1 = _b.sent();
                console.error(err_1);
                resp.setRes(err_1);
                return [3 /*break*/, 6];
            case 6:
                res.send(resp.toRes());
                return [2 /*return*/];
        }
    });
}); });
router.get('/dir', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var path, resp, lstat, _a, _b, _c, err_2;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                path = req.query.path;
                resp = new Response_1.default();
                if (!(typeof path === 'string')) return [3 /*break*/, 7];
                _d.label = 1;
            case 1:
                _d.trys.push([1, 5, , 6]);
                lstat = (0, fs_extra_1.lstatSync)(path);
                if (!lstat.isDirectory()) return [3 /*break*/, 3];
                _b = (_a = resp).setRes;
                _c = ['获取目录详情成功', true];
                return [4 /*yield*/, (0, utils_1.dirDetail)(path)];
            case 2:
                _b.apply(_a, _c.concat([_d.sent()]));
                return [3 /*break*/, 4];
            case 3:
                resp.setRes("".concat(path, " \u4E0D\u662F\u4E00\u4E2A\u76EE\u5F55"));
                _d.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                err_2 = _d.sent();
                console.error(err_2);
                resp.setRes("".concat(err_2));
                return [3 /*break*/, 6];
            case 6: return [3 /*break*/, 8];
            case 7:
                if (path === undefined) {
                    resp.setRes('path 为必传参数!');
                }
                else {
                    resp.setRes('path 类型必须为string!');
                }
                _d.label = 8;
            case 8:
                res.send(resp.toRes());
                return [2 /*return*/];
        }
    });
}); });
router.get('/file', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var path, resp, draft, _a, name_1, ext;
    var _b;
    return __generator(this, function (_c) {
        path = req.query.path;
        resp = new Response_1.default();
        draft = {
            filename: '',
            lang: 'plaintext',
            content: '',
            path: path,
        };
        if (typeof path === 'string') {
            try {
                draft.content = (0, fs_extra_1.readFileSync)(path, 'utf-8');
                _a = (0, path_1.parse)(path), name_1 = _a.name, ext = _a.ext;
                draft.filename = name_1;
                draft.lang = (_b = (0, ext2lang_1.default)(ext)) !== null && _b !== void 0 ? _b : 'plaintext';
                resp.setRes('获取文件内容成功', true, draft);
            }
            catch (err) {
                console.error(err);
                resp.setRes("".concat(err));
            }
        }
        else if (path === undefined) {
            resp.setRes('path 为必传参数!');
        }
        else {
            resp.setRes('path 类型必须为string!');
        }
        res.send(resp.toRes());
        return [2 /*return*/];
    });
}); });
exports.default = router;
