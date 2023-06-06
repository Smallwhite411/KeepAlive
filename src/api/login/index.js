import  request  from "@/utils/servive2"

/** 获取登录验证码 */
export function getLoginCodeApi() {
  return request({
    url: "login/code",
    method: "get"
  })
}

/** 登录并返回 Token */
export const loginApi = (url, data) => {
    console.log("我是",url,data)
  return request.post(url, data)
}

/** 获取用户详情 */
export function getUserInfoApi(url,params) {
  console.log(url,params)
  return request.get(url, {
    params: {
      id: params.id
    }
  })
}
