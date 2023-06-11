import {
    getUserInfoApi,
    loginApi
} from "@/api/login";
import Vue from "vue";
import asyncRouteSettings from "@/config/async-route";
import router, {
    resetRouter
} from "@/router";
import {
    removeToken,
    setToken
} from "@/utils/cookies";


const user = {
    namespaced: true,
    state: {
        token: "",
        roles: [],
        username: ""
    },
    actions: {
        login(context, value) {
            return new Promise((resolve, reject) => {
                loginApi("/users/login", value)
                    .then((res) => {
                        // 朝cookie中存入 token
                        setToken(res.data.token)
                        context.commit("settokens", res.data.token)
                        Vue.prototype.$message({
                            message: '登陆成功',
                            type: "success",
                            center: true,
                        })
                        router.push("/dashboard")
                        resolve(true)
                    })
                    .catch((error) => {
                        reject(error)
                    })
            })
        },

        getInfo(context, value) {
            return new Promise((resolve, reject) => {
                getUserInfoApi("/users/info", value)
                    .then((res) => {
                        // 服务端返回的用户详情中只有 username和 roles
                        const data = res.data
                        context.commit("setName", data.username)
                        // 验证返回的 roles 是否是一个非空数组
                        if (data.roles && data.roles.length > 0) {

                            context.commit("setRoles", data.roles)

                        } else {
                            // 塞入一个没有任何作用的默认角色，不然路由守卫逻辑会无限循环
                            context.commit("setRoles", asyncRouteSettings.defaultRoles)
                        }
                        resolve(res)
                    })
                    .catch((error) => {
                        reject(error)
                    })
            })
        },

        changeJurisdiction(context, value) {
            if (value !== 'admin') {
                context.commit("setRoles", ["root"])
            } else {
                context.commit("setRoles", ["admin"])
            }
        },

        async changeRoles(context, value) {
            /** 切换角色 */
            const newToken = "token-"
            context.commit("settokens", newToken)
            console.log("value",value)
            resetRouter()
            value.routes.forEach((item) => { //value有问题
                router.addRoute(item)
            })
            return new Promise((resolve, reject) => {
                getUserInfoApi("/users/info", value)
                    .then((res) => {
                        // 服务端返回的用户详情中只有 username和 roles
                        const data = res.data
                        context.commit("setName", data.username)
                        // 验证返回的 roles 是否是一个非空数组
                        if (data.roles && data.roles.length > 0) {

                            context.commit("setRoles", data.roles)

                        } else {
                            // 塞入一个没有任何作用的默认角色，不然路由守卫逻辑会无限循环
                            context.commit("setRoles", asyncRouteSettings.defaultRoles)
                        }
                        resolve(res)
                    })
                    .catch((error) => {
                        reject(error)
                    })
            })
        }
    },
    mutations: {
        setRoles(state, value) {
            state.roles = value
        },
        settokens(state, value) {
            state.token = value
        },
        setName(state, value) {
            state.username = value
        },
        resetToken(state) {
            /** 重置 Token */
            removeToken()
            state.token = ""
            state.roles = []
        },
        logout(state) {
            removeToken()
            state.token = ""
            state.roles = []
            resetRouter() //刷新路由
        }
    }
}

export default user;