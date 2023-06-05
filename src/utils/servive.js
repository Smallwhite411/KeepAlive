import axios from "axios";
import { getToken } from "./cookies";
import { get } from "lodash-es"
import Vue from "vue";


// 创建请求实例
function createService() {
    // 创建一个 Axios实例
    const service = axios.create();
    // 请求拦截
    service.interceptors.request.use(
        (config) => config,
        // 发送失败
        (error) => Promise.reject(error)
    )

    // 响应拦截
    service.interceptors.response.use(
        (response) => {
            // apiData 是API 返回的数据
            const apiData = response.data;
            // code是和后端约定的code（）
            const code = apiData.code;
            // 如果没有这个code，代表不是本项目后端开发的API
            if (code === undefined) {
                Vue.prototype.$message.success("非本系统的接口")
                return Promise.reject(new Error("非本系统的接口"))
            }
        },
        (error) => {
            // status 是状态码  根据抛出来的错误返回对应的状态码
            const status = get(error, "response.status");

            switch (status) {
                case 400:
                    error.message = "请求错误"
                    break
                case 401:
                    // Token 过期时，直接退出登录并强制刷新页面（会重定向到登录页）
                    location.reload()
                    break
                case 403:
                    error.message = "拒绝访问"
                    break
                case 404:
                    error.message = "请求地址出错"
                    break
                case 408:
                    error.message = "请求超时"
                    break
                case 500:
                    error.message = "服务器内部错误"
                    break
                case 501:
                    error.message = "服务未实现"
                    break
                case 502:
                    error.message = "网关错误"
                    break
                case 503:
                    error.message = "服务不可用"
                    break
                case 504:
                    error.message = "网关超时"
                    break
                case 505:
                    error.message = "HTTP 版本不受支持"
                    break
                default:
                    break
            }
            Vue.prototype.$message.error(error.message);
            return Promise.reject(error)

        }
    )
    return service;
}

// 创建请求方法
function createRequestFunction(service) {
    return function (config) {
        const configDefault = {
            baseURL: "/api",
            headers: {
                // 携带 Token
                Authorization: "Bearer " + getToken(),
                "Content-Type": get(config, "headers.Content-Type", "application/json")
            },
            withCredentials: true,// 异步请求携带cookie
            timeout: 5000,
            data: {}
        }
        return service(Object.assign(configDefault, config))
    }
}

/** 用于网络请求的实例 */
export const service = createService()
/** 用于网络请求的方法 */
export const request = createRequestFunction(service)