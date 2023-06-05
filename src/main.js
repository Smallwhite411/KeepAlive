import Vue from 'vue'
import App from './App.vue'
import 'element-ui/lib/theme-chalk/index.css'
// import element from './plugins'
import './router/permission'
import router from './router/index';
import VueRouter from 'vue-router';
import store from './store';
import ElementUI from 'element-ui';
import '../src/styles/index.css'

Vue.config.productionTip = false

// 加载插件
// Vue.use(element)
Vue.use(ElementUI)
Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}


const app = new Vue({
  render: h => h(App),
  router,
  store,

})

app.$mount('#app')