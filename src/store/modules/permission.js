import {
    constantRoutes,
    asyncRoutes
} from '@/router';
import asyncRouteSettings from '@/config/async-route';

const permission = {
    namespaced: true,
    state: {
        routes: [], //路由
        dynamicRoutes: [], //动态路由 里面的数据
        isAdmin: false
    },
    actions: {
        async setRoutes(context, value) { //根据当前用户 来切换路由
            if (!asyncRouteSettings.open) { //判断当前是不是超级管理员
                await context.commit("setDynamicRoutes", asyncRoutes)
            } else {
                await context.dispatch('filterAsyncRoutes', value)
            }
            let newRoutes = constantRoutes.concat(context.state.dynamicRoutes)
            await context.commit('setRoutes', newRoutes) //组合两个或多个数组。此方法返回一个新数组，而不修改任何现有数组。
        },
        async filterAsyncRoutes(context, value) { //进行权限判断 路由筛选

            function filtersRoutes(routes, roles) {
                const res = [];

                routes.forEach((route) => {
                    const r = {
                        ...route
                    }
                    context.dispatch("hasPermission", {roles,r})
                    if (context.state.isAdmin) {
                        if (r.children) {
                            r.children = filtersRoutes(r.children, roles)
                        }
                        res.push(r)
                    }
                })

                return res;
            }
            console.log("value",value)
            let accessedRoutes = filtersRoutes(asyncRoutes, value)

            await context.commit("setDynamicRoutes", accessedRoutes)
        },
        hasPermission(context, value) { //权限判断

            if (value.r.meta && value.r.meta.roles) {
                return value.roles.some((role) => {
                    if (value.r.meta.roles !== undefined) {
                        context.commit("setIsAdmin", value.r.meta.roles.includes(role))
                        return value.r.meta.roles.includes(role)
                    } else {
                        context.commit("setIsAdmin", false)
                        return false
                    }
                })
            } else {
                context.commit("setIsAdmin", true)
                return true
            }
        }
    },
    mutations: {

        setRoutes(state, value) {
            state.routes = value
        },

        setDynamicRoutes(state, value) {
            state.dynamicRoutes = value
        },

        setIsAdmin(state, value) {
            state.isAdmin = value
        }
    }
}

export default permission;