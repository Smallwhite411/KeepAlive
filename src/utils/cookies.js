/** 统一处理 Cookie */

import CacheKey from "@/config/cacheKey"
import Cookies from "js-cookie"

export const getToken = () => { //读取cookie
  return Cookies.get(CacheKey.TOKEN)
}
export const setToken = (token) => { //写入cookie 设置10分钟自动清除cookie
  Cookies.set(CacheKey.TOKEN, token,{ expires: new Date(Date.now() + 10 * 60 * 1000) })
}
export const removeToken = () => { //移除cookie
  Cookies.remove(CacheKey.TOKEN)
}
