/*
 * @Author: Archy
 * @Date: 2022-01-31 16:51:10
 * @LastEditors: Archy
 * @LastEditTime: 2022-01-31 17:16:43
 * @FilePath: \arkgen\server\src\class\Response.ts
 * @description:
 */
export default class Resp {
  private _msg: string
  private _data: any
  private _success: Boolean
  constructor() {
    this._success = false
    this._data = {}
    this._msg = ''
  }

  set msg(msg: string) {
    this._msg = msg
  }

  get msg() {
    return this._msg
  }

  set data(data: any) {
    this._data = data
  }

  get data() {
    return this._data
  }

  get success() {
    return this._success
  }

  set success(success: Boolean) {
    this._success = success
  }

  toRes() {
    const draft: { msg: string; success: Boolean; data: any } = {
      success: false,
      data: {},
      msg: '',
    }
    draft.msg = this._msg
    draft.success = this._success
    draft.data = this._data
    return draft
  }
}
