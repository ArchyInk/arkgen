/*
 * @author: Archy
 * @Date: 2022-02-09 14:17:18
 * @LastEditors: Archy
 * @LastEditTime: 2022-02-09 14:45:18
 * @FilePath: \arkgen\react\src\api\shims-axios.d.ts
 * @description: 
 */
import type { GeneralResponse, PageDataResponse } from './response'
declare module 'axios' {
  export interface AxiosResponse<T = any> extends GeneralResponse<T> {

  }
}