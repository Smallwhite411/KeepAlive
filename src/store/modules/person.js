
const person =  {
    namespaced:true,
    actions: { //准备actions，用于响应组件中的动作
        jiaOdd(context, value) {
            // if (context.state.sum % 2) {
                console.log(context);
                context.commit('JIAODD', value,context)
            // }
        },
        jiaWait(context, value) {
            setTimeout(() => {
                context.commit('JIAWAIT', value)

            }, 500)
        }

    },
    mutations: { //用于操作数据，可以类比react中的reducer 在muations中处理网络请求
        JIA(state, value) {
            console.log("mutations中的JIA被调用了", state);
            state.sum += value
        },
        JIAN(state, value) {
            state.sum -= value
        },
        JIAODD(state, value) {
            state.sum += value
        },
        JIAWAIT(state, value) {
            state.sum += value
        },

    },
    state: { //用于存储数据
        sum: 0,
    }

}

export default person;