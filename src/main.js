import Vue from 'vue'
import App from './App.vue'
// import { loadPlugins } from './plugins'
import 'element-ui/lib/theme-chalk/index.css'
import element from './plugins'
// import { Button } from 'element-ui'

Vue.config.productionTip = false

// 加载插件
// loadPlugins(Vue)
Vue.use(element)

const app = new Vue({
  render: h => h(App),
})



app.$mount('#app')
