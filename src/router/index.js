import Layout from '@/layout/index.vue'
import VueRouter from 'vue-router'
/** 常驻路由 */
export const constantRoutes = [{
        path: "/",
        component: Layout,
        redirect: "/dashboard", //重定向到首页
        children: [{
            path: "dashboard",
            component: () => import("@/views/DashBoard/index.vue"),
            name: "Dashboard",
            meta: {
                title: "首页",
                svgIcon: "dashboard",
                affix: true
            }
        }]
    },
    {
        path: "/login",
        component: () => import("@/views/Login/index.vue"),
        name: "Login",
        meta: {
            hidden: true
        }
    },
    {
        path: "/403",
        component: () => import("@/views/ErrorPage/NoResourcesFound"),
        meta: {
            hidden: true
        }
    },
    {
        path: "/404",
        component: () => import("@/views/ErrorPage/AccessDenied"),
        meta: {
            hidden: true
        },
        alias: "/:pathMatch(.*)*"
    },
]

/**
 * 动态路由
 * 用来放置有权限 (Roles 属性) 的路由
 * 必须带有 Name 属性
 */
export const asyncRoutes = [{
        path: "/permission",
        component: Layout,
        redirect: "/permission/page",
        name: "Permission",
        meta: {
            title: "权限管理",
            svgIcon: "lock",
            roles: ["admin", "root"], // 可以在根路由中设置角色
            alwaysShow: true // 将始终显示根菜单
        },
        children: [{
                path: "page",
                component: () => import("@/views/Permission/index.vue"),
                name: "PagePermission",
                meta: {
                    title: "页面权限",
                    roles: ["admin"]
                    // 或者在子导航中设置角色 只有admin用户才能看见和使用这个路由
                }
            },
            {
                path: "directive",
                component: () => import("@/views/Permission/components/Directive/index.vue"),
                name: "DirectivePermission",
                meta: {
                    title: "指令权限" // 如果未设置角色，则表示：该页面不需要权限，但会继承根路由的角色
                }
            }
        ]
    },
    {
        path: "/:pathMatch(.*)*", // Must put the 'ErrorPage' route at the end, 必须将 'ErrorPage' 路由放在最后
        redirect: "/404",
        name: "ErrorPage",
        meta: {
            hidden: true
        }
    }
]


const createRouter = () => new VueRouter({
    mode: "history",
    scrollBehavior: () => ({
        y: 0
    }), //切换路由始终保持页面顶部
    routes: constantRoutes //只挂载静态路由！！
})


const router = createRouter()

export function resetRouter() { //用户权限切换  路由重置

    try{
        router.matcher = createRouter().matcher // 重置路由，不同用户菜单权限会有所不同，在切换用户时，会出现菜单错乱的情况
    } catch(err) {
        window.location.reload()
    }
}


export default router;