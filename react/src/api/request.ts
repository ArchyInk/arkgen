/*
 * @Author: Archy
 * @Date: 2022-01-30 11:29:23
 * @LastEditors: Archy
 * @LastEditTime: 2022-01-30 22:11:34
 * @FilePath: \arkgen\react\src\api\request.ts
 * @description:
 */
import Axios from 'axios'
import { notification } from 'antd'

export const request = Axios.create({
  baseURL: import.meta.env.VITE_API_URL as string,
})

request.interceptors.response.use(
  (response) => {
    const data = response.data
    if (response.status === 200) {
      return data
    }

    notification.error({
      message: `请求错误 ${response.statusText}: ${response}`,
      description: data.msg || response.statusText || 'Error',
    })

    return Promise.reject(new Error(response.statusText || 'Error'))
  },
  (error) => {
    console.warn('err:', error, error.response)
    if (error.response && error.response.status) {
      switch (error.response.status) {
        case 404:
          notification.error({
            message: `请求不存在`,
            description: error.response.data?.msg || 'Error',
          })
          break
        case 406:
          notification.error({
            message: `请求参数有误`,
            description: error.response.data?.msg || 'Error',
          })
          break
        default:
          notification.error({
            message: `请求错误`,
            description: error.response.data?.msg || 'Error',
          })
      }
    }
    return Promise.reject(error)
  }
)

