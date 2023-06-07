import router from "@/router"
import Vue from "vue"
import {
  whiteList
} from "@/config/white-list"
import {
  getToken
} from "@/utils/cookies"
import asyncRouteSettings from "@/config/async-route"
import NProgress from "nprogress"
import store from "@/store"
import "nprogress/nprogress.css"
// import user from "@/store/modules/user"


NProgress.configure({
  showSpinner: false
})
// nprogress 用于加载页面时显示进度条

// 全局前置守卫 在路由跳转之前执行
router.beforeEach(async (to, _from, next) => {
  console.log("to",to)
  NProgress.start(); //路由跳转前的动画 进度条开始
  // 判断该用户是否登录
  if (getToken()) {
    // 每切换一次路由，就会执行一次
    if (to.path === "/login") {
      // 如果已经登录，并准备进入 Login 页面，则重定向到主页
      // login => /(重定向) => dashboard
      next({
        path: "/"
      })
      NProgress.done(); //进度条结束
    } else {
      // 检查用户是否已获得其权限角色
      if (store.state.user.roles.length === 0) {
        try {
          // 是否开启动态路由
          if (asyncRouteSettings.open) {
            // 注意：角色必须是一个数组！ 例如: ['admin'] 或 ['developer', 'editor']

            await store.dispatch("user/getInfo",{
              id: "admin"
            })
            // 根据角色生成可访问的 Routes（可访问路由 = 常驻路由 + 有访问权限的动态路由）
            const roles = store.state.user.roles;

            store.dispatch("permission/setRoutes", roles)
          } else {

            // 没有开启动态路由功能，则启用默认角色
            store.commit("user/setRoles", asyncRouteSettings.defaultRoles)
          }
          // 将'有访问权限的动态路由' 添加到 Router 中
          // 添加了两个路由，一个是任意路由（404展示），一个是权限路由
          store.state.permission.dynamicRoutes.forEach((route) => {
            // 向路由器添加一条新路由。如果该路由有一个名称，并且已经存在一个具有相同名称的路由，则会覆盖该路由。
            router.addRoute(route)
          })
          // 确保添加路由已完成
          // 设置 replace: true, 因此导航将不会留下历史记录
          next({
            ...to,
            replace: true
          })
        } catch (err) {
          // 过程中发生任何错误，都直接重置 Token，并重定向到登录页面
          Vue.prototype.$message.error(err.message || "路由守卫过程发生错误")
          next("/login"); //如果发生错误就重新跳转回login界面
          NProgress.done(); //进度条动画加载结束
        }
      } else {
        next()
      }
    }
  } else {
    // 如果没有 Token
    if (whiteList.indexOf(to.path) !== -1) { //如果是 login的话就进来
      // 如果在免登录的白名单中，则直接进入
      next()
    } else {
      // 其他没有访问权限的页面将被重定向到登录页面
      next("/login")
      NProgress.done()
    }
  }
})

// 添加一个导航钩子，在每次导航后执行。返回一个删除已注册钩子的函数。 全局后置守卫
router.afterEach(() => {
  NProgress.done()
})