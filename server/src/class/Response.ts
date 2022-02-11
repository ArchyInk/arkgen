/*
 * @Author: Archy
 * @Date: 2022-01-31 16:51:10
 * @LastEditors: Archy
 * @LastEditTime: 2022-02-11 17:10:30
 * @FilePath: \arkgen\server\src\class\Response.ts
 * @description:
 */
export type ResponseType<T> = {
  msg: string,
  data: T,
  success: boolean
}
export default class Resp<T> {
  private _msg: string
  private _data: T
  private _success: boolean
  constructor() {
    this._success = false
    this._msg = ''
  }

  set msg(msg: string) {
    this._msg = msg
  }

  get msg() {
    return this._msg
  }

  set data(data: T) {
    this._data = data
  }

  get data() {
    return this._data
  }

  get success() {
    return this._success
  }

  set success(success: boolean) {
    this._success = success
  }

  toRes(): ResponseType<T> {
    const draft: ResponseType<T> = {
      success: false,
      msg: '',
      data: undefined,
    }
    draft.msg = this._msg
    draft.success = this._success
    draft.data = this._data
    return draft
  }

  setRes(msg: string, success?: boolean, data?: T) {
    this._msg = msg
    this._success = success ? success : false
    this._data = data ? data : undefined
  }
}
