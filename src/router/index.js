import Layout from '@/layout/index.vue'
import {
    createRouter,
    createWebHashHistory,
    createWebHistory
} from 'vue-router'
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
            roles: ["admin", "editor"], // 可以在根路由中设置角色
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

// 优化的代码，只需要修改hash或html5来实现路由模式的切换  #/
// html5其实说的是由 html5提供的history API来实现路由 /
const router = createRouter({
    history: import.meta.env.VITE_ROUTER_HISTORY === "hash" ?
        createWebHashHistory(
            import.meta.env.VITE_PUBLIC_PATH) :
        createWebHistory(
            import.meta.env.VITE_PUBLIC_PATH),
    routes: constantRoutes
})

export default router;