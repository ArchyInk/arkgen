"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author: Archy
 * @Date: 2022-01-31 16:51:10
 * @LastEditors: Archy
 * @LastEditTime: 2022-01-31 17:16:43
 * @FilePath: \arkgen\server\src\class\Response.ts
 * @description:
 */
var Resp = /** @class */ (function () {
    function Resp() {
        this._success = false;
        this._data = {};
        this._msg = '';
    }
    Object.defineProperty(Resp.prototype, "msg", {
        get: function () {
            return this._msg;
        },
        set: function (msg) {
            this._msg = msg;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Resp.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (data) {
            this._data = data;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Resp.prototype, "success", {
        get: function () {
            return this._success;
        },
        set: function (success) {
            this._success = success;
        },
        enumerable: false,
        configurable: true
    });
    Resp.prototype.toRes = function () {
        var draft = {
            success: false,
            data: {},
            msg: '',
        };
        draft.msg = this._msg;
        draft.success = this._success;
        draft.data = this._data;
        return draft;
    };
    return Resp;
}());
exports.default = Resp;
