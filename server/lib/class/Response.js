"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Resp = /** @class */ (function () {
    function Resp() {
        this._success = false;
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
            msg: '',
            data: undefined,
        };
        draft.msg = this._msg;
        draft.success = this._success;
        draft.data = this._data;
        return draft;
    };
    Resp.prototype.setRes = function (msg, success, data) {
        this._msg = msg;
        this._success = success ? success : false;
        this._data = data ? data : undefined;
    };
    return Resp;
}());
exports.default = Resp;
