const permission =  {
    namespaced: true,
    state: {
        routes: [], //路由
        dynamicRoutes: [], //动态路由 里面的数据
    },
    actions: {
        setRoutes(context, value) { //根据当前用户 来切换路由
            context.commit('filterAsyncRoutes',value)
        },
        filterAsyncRoutes(context, value) {
            context.dispatch("filterAsyncRoutes",value)
        }
    },
    mutations: {

        setRoutes(state) {
            state.routes = state.routes.concat(state.dynamicRoutes)
        }
    }
}

export default permission;