import axios from "axios";
import {
    getToken
} from "./cookies";
import { get } from "lodash-es"
import Vue from "vue";

const request = axios.create({
    baseURL: process.env.VUE_APP_BASE_API, // 所有的请求地址前缀部分(没有后端请求不用写)
    timeout: 80000, // 请求超时时间(毫秒)
    withCredentials: true, // 异步请求携带cookie
    headers: {
        // 设置后端需要的传参类型
        'Content-Type': 'application/json',
        'token': 'x-auth-token', //一开始就要token
        'X-Requested-With': 'XMLHttpRequest',
    },
})
/// request拦截器
request.interceptors.request.use(
    config => {
        //添加请求头
        config.headers["Authorization"] = "Bearer " + getToken()
        // config.headers["Authorization"]="Bearer "+ token

        return config
    },
    error => {
        // 对请求错误做些什么
        Promise.reject(error)
    }
)

// response 拦截器
request.interceptors.response.use(
    response => {
        // 对响应数据做点什么
        // apiData 是API 返回的数据
        const apiData = response.data;
        // code是和后端约定的code（）
        const code = apiData.code;
        // 如果没有这个code，代表不是本项目后端开发的API
        if (code === undefined) {
            Vue.prototype.$message.error("非本系统的接口")
            return Promise.reject(new Error("非本系统的接口"))
        }

        return response.data
    },
    error => {
        // 对响应错误做点什么
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
export default request