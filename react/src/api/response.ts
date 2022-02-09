/*
 * @author: Archy
 * @Date: 2022-02-09 13:28:44
 * @LastEditors: Archy
 * @LastEditTime: 2022-02-09 14:47:58
 * @FilePath: \arkgen\react\src\api\response.ts
 * @description: 
 */
export interface GeneralResponse<T> {
  success: Boolean,
  msg: string,
  obj: T
}

export interface PageData<T> {
  currentPage: number,
  totalPage: number,
  totalCount: number,
  pageSize: number,
  data: T[]
}

export interface PageDataResponse<T> extends GeneralResponse<PageData<T>> {
}

